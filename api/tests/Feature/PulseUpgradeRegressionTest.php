<?php

namespace Tests\Feature;

use App\Tracker;
use App\TrackerEntry;
use App\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;
use Tests\TestCase;

class PulseUpgradeRegressionTest extends TestCase
{
    private $keyDirectory;

    protected function setUp(): void
    {
        parent::setUp();

        // These checks run before migrations: this suite must never use an app DB.
        $this->assertSame('sqlite', config('database.default'));
        $this->assertSame(':memory:', config('database.connections.sqlite.database'));
        $this->assertSame(0, Artisan::call('migrate', ['--force' => true]));

        $this->keyDirectory = sys_get_temp_dir().'/pulse-upgrade-'.bin2hex(random_bytes(8));
        mkdir($this->keyDirectory, 0700);
        $key = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
        $this->assertNotFalse($key);
        $this->assertTrue(openssl_pkey_export($key, $privateKey));
        $details = openssl_pkey_get_details($key);
        file_put_contents($this->keyDirectory.'/oauth-private.key', $privateKey);
        file_put_contents($this->keyDirectory.'/oauth-public.key', $details['key']);
        chmod($this->keyDirectory.'/oauth-private.key', 0600);
        chmod($this->keyDirectory.'/oauth-public.key', 0600);
        Passport::loadKeysFrom($this->keyDirectory);
    }

    protected function tearDown(): void
    {
        Passport::loadKeysFrom(null);
        if ($this->keyDirectory && is_dir($this->keyDirectory)) {
            foreach (['oauth-private.key', 'oauth-public.key'] as $name) {
                $path = $this->keyDirectory.'/'.$name;
                if (is_file($path)) {
                    unlink($path);
                }
            }
            rmdir($this->keyDirectory);
        }

        parent::tearDown();
    }

    public function test_registration_preserves_validation_and_password_handling()
    {
        $payload = [
            'name' => 'Upgrade Test',
            'email' => 'upgrade@example.com',
            'password' => 'upgrade-password',
            'password_confirmation' => 'upgrade-password',
        ];

        $response = $this->postJson('/api/register', $payload);
        $response->assertStatus(200)->assertJsonFragment(['email' => $payload['email']]);
        $this->assertArrayNotHasKey('password', $response->json());
        $this->assertTrue(Hash::check($payload['password'], User::first()->password));

        $this->postJson('/api/register', $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
        $this->assertSame(1, User::count());
    }

    public function test_password_grant_token_authenticates_the_existing_user()
    {
        $user = $this->createUser();
        $client = app(ClientRepository::class)->createPasswordGrantClient(
            null, 'Upgrade regression client', 'http://localhost'
        );

        $response = $this->postJson('/oauth/token', [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $user->email,
            'password' => 'upgrade-password',
            'scope' => '',
        ]);
        $response->assertStatus(200)
            ->assertJsonStructure(['token_type', 'expires_in', 'access_token', 'refresh_token']);

        $this->getJson('/api/me', ['Authorization' => 'Bearer '.$response->json('access_token')])
            ->assertStatus(200)
            ->assertJsonFragment(['id' => $user->id, 'email' => $user->email]);
    }

    public function test_tracker_labels_entries_and_archiving_keep_working()
    {
        $user = $this->createUser();
        Passport::actingAs($user);

        $response = $this->postJson('/api/trackers', [
            'name' => 'Regression tracker',
            'description' => 'Upgrade coverage',
        ]);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Regression tracker']);
        $tracker = Tracker::findOrFail($response->json('id'));
        $this->assertSame($user->id, (int) $tracker->user_id);
        $this->assertSame(3, $tracker->labels()->count());

        $entryDate = now()->subDay()->format('Y-m-d');
        $entry = $this->postJson('/api/trackers/'.$tracker->id.'/entries', [
            'tracker_label_id' => $tracker->labels()->first()->id,
            'entry_date' => $entryDate,
        ]);
        $entry->assertStatus(200);
        $this->assertSame($entryDate, TrackerEntry::findOrFail($entry->json('id'))->entry_date->format('Y-m-d'));

        $this->getJson('/api/trackers')->assertStatus(200)->assertJsonFragment(['name' => $tracker->name]);

        $this->deleteJson('/api/trackers/'.$tracker->id)
            ->assertStatus(200)->assertJson(['success' => true]);
        $this->assertTrue($tracker->fresh()->trashed());
        $this->getJson('/api/trackers')->assertStatus(200)->assertExactJson([]);
        $this->getJson('/api/trackers?archived=1')
            ->assertStatus(200)->assertJsonFragment(['name' => $tracker->name]);
    }

    public function test_unauthenticated_requests_cannot_list_trackers()
    {
        $this->getJson('/api/trackers')->assertStatus(401);
    }

    private function createUser($email = 'upgrade@example.com')
    {
        return User::create([
            'name' => 'Upgrade Test',
            'email' => $email,
            'password' => 'upgrade-password',
        ]);
    }
}
