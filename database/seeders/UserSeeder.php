<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $account1 = Account::where('email', '=', 'ag@gmail.com')->first();
        $account2 = Account::where('email', '=', 'customer@gmail.com')->first();

        // dd($account1->id);

        $data = [
            [
                'id' => Str::uuid(),
                'account_id' => $account1->id,
                'nama' => 'AG',
                'jk' => '1',
                'handphone' => '0988888',
                'alamat' => 'XXXXXXXXX',
                'foto' => 'user.png',
                'status' => '2'
            ],
            [
                'id' => Str::uuid(),
                'account_id' => $account2->id,
                'nama' => 'Customer',
                'jk' => '2',
                'handphone' => '0988888',
                'alamat' => 'XXXXXXXXX',
                'foto' => 'user.png',
                'status' => '2'
            ],
        ];

        User::insert($data);
    }
}
