<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (! User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        if (! User::where('email', 'admin@smartexam.com')->exists()) {
            User::factory()->admin()->create([
                'name' => 'Admin',
                'email' => 'admin@smartexam.com',
            ]);
        }

        if (! User::where('email', 'nasaruddinpawe@gmail.com')->exists()) {
            User::factory()->admin()->create([
                'name' => 'Nasaruddin',
                'email' => 'nasaruddinpawe@gmail.com',
                'password' => bcrypt('password'),
            ]);
        }

        $this->call([
            LandingContentSeeder::class,
        ]);
    }
}
