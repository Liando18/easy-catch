<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\PlatformOwner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PlatformOwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $account1 = Account::where('email', '=', 'founder@gmail.com')->first();
        $account2 = Account::where('email', '=', 'admin@gmail.com')->first();
        $account3 = Account::where('email', '=', 'distributor@gmail.com')->first();

        // dd($account1->id);

        $data = [
            [
                'id' => Str::uuid(),
                'account_id' => $account1->id,
                'nama' => 'Founder',
                'jabatan' => '1',
            ],
            [
                'id' => Str::uuid(),
                'account_id' => $account2->id,
                'nama' => 'Super Admin',
                'jabatan' => '2',
            ],
            [
                'id' => Str::uuid(),
                'account_id' => $account3->id,
                'nama' => 'Distributor',
                'jabatan' => '3',
            ],
        ];

        PlatformOwner::insert($data);
    }
}
