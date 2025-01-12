<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => Str::uuid(),
                'email' => 'founder@gmail.com',
                'password' => Hash::make('123'),
                'role' => '1'
            ],
            [
                'id' => Str::uuid(),
                'email' => 'admin@gmail.com',
                'password' => Hash::make('123'),
                'role' => '2'
            ],
            [
                'id' => Str::uuid(),
                'email' => 'ag@gmail.com',
                'password' => Hash::make('123'),
                'role' => '4'
            ],
            [
                'id' => Str::uuid(),
                'email' => 'customer@gmail.com',
                'password' => Hash::make('123'),
                'role' => '4'
            ],
            [
                'id' => Str::uuid(),
                'email' => 'distributor@gmail.com',
                'password' => Hash::make('123'),
                'role' => '5'
            ],
        ];

        Account::insert($data);
    }
}
