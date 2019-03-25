<?php

use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});

$factory->define(App\Tracker::class, function(Faker $faker) {
    return [
        'name' => $faker->unique()->word,
        'description' => $faker->realText(50)
    ];
});


$factory->define(App\TrackerLabel::class, function(Faker $faker) {
    return [
        'name' => $faker->unique()->word,
        'color' => $faker->hexcolor
    ];
});

$factory->define(App\TrackerEntry::class, function(Faker $faker) {
    return [
        'entry_date' => $faker->dateTimeThisYear()
    ];
});