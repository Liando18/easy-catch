<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DataMerchantController extends Controller
{
    public function index()
    {
        $data_merchant = User::with(['account'])->where("status", "=", "1")->get();

        return Inertia::render('Dashboard/DataMerchant', [
            'title' => "Data Merchant",
            "data_merchant" => $data_merchant
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email|unique:account,id,' . $id,
            'password' => 'nullable|min:8',
        ], [
            'email.required' => 'Email tidak boleh kosong',
            'email.unique' => 'Email sudah digunakan',
            'password.min' => 'Password harus minimal 8 karakter',
        ]);

        $account = Account::findOrFail($id);

        $account->email = $request->email;
        if ($request->password) {
            $account->password = Hash::make($request->password);
        }
        $account->save();

        return back()->with('message', 'Data berhasil diperbarui');
    }

    public function destroy($id)
    {
        Account::findOrFail($id)->delete();

        return back()->with('message', 'Data berhasil dihapus');
    }
}
