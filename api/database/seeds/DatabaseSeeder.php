<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\User::query()->truncate();
        App\Tracker::query()->truncate();
        App\TrackerEntry::query()->truncate();
        App\TrackerLabel::query()->truncate();

        $user = factory(App\User::class)->make([
            'email' => 'admin@admin.com'
            'is_admin' => true
        ]);

        $user->save();

        // Seed trackers
        foreach(range(0, 4) as $i) {
            $tracker = factory(App\Tracker::class)->make();
            $user->trackers()->save($tracker);
        }

        $colors = [
            '#2186EB',
            '#eb5757',
            '#d5dde5',
            '#27AE60'
        ];

        $names = [
            'No Fap',
            'Relapsed',
            'Muntik Lang',
            'Eut'
        ];

        App\Tracker::all()->each(function($tracker) use ($colors, $names) {
            // Seed tracker labels
            foreach(range(0, 3) as $j) {
                $label = factory(App\TrackerLabel::class)->make([
                    'name' => $names[$j],
                    'color' => $colors[$j]
                ]);

                $tracker->labels()->save($label);
            }

            // Seed tracker entries
            $tracker->labels->each(function($label) use ($tracker) {
                foreach(range(0, 4) as $j) {
                    $entry = factory(App\TrackerEntry::class)->make([
                        'tracker_label_id' => $label->id
                    ]);

                    $tracker->entries()->save($entry);
                }
            });
        });
        // $this->call(UsersTableSeeder::class);
    }
}
