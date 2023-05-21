<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Other',
            'email' => 'Other.Other@gmail.com',
            'password' => Hash::make('test123'),
            'account_type' => 'vendeur',
            'tel' => 1354,
        ]);
        // User::factory()->count(10)->create();
    }
}
