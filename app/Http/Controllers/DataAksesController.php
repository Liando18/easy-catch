<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\PlatformOwner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DataAksesController extends Controller
{
    public function index()
    {
        $data_akses = PlatformOwner::with(['account'])->get();

        return Inertia::render('Dashboard/DataAkses', [
            'data_akses' => $data_akses,
            'title' => 'Data Akses'
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|lowercase|email|max:50|unique:' . Account::class,
            'password' => 'required',
            'nama' => 'required',
            'jabatan' => 'required'
        ], [
            'email.required' => 'Email tidak boleh kosong',
            'email.lowercase' => 'Email tidak valid, berikan huruf kecil semuanya',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Password tidak boleh kosong',
            'nama.required' => 'Nama tidak boleh kosong',
            'jabatan.required' => 'Jabatan tidak boleh kosong',
        ]);

        $account = Account::create([
            'id' => Str::uuid(),
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->jabatan,
        ]);

        PlatformOwner::create([
            'id' => Str::uuid(),
            'account_id' => $account->id,
            'nama' => $request->nama,
            'jabatan' => $request->jabatan,
        ]);

        return back()->with('message', 'Data berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email|unique:account,id,' . $id,
            'password' => 'nullable|min:6',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|in:1,2,3,4',
        ], [
            'email.required' => 'Email tidak boleh kosong',
            'email.unique' => 'Email sudah digunakan',
            'password.min' => 'Password harus minimal 6 karakter',
            'nama.required' => 'Nama tidak boleh kosong',
            'jabatan.required' => 'Jabatan tidak boleh kosong',
        ]);

        $platform_owner = PlatformOwner::findOrFail($id);

        $account = Account::findOrFail($platform_owner->account_id);

        $account->email = $request->email;
        if ($request->password) {
            $account->password = Hash::make($request->password);
        }
        $account->role = $request->jabatan;
        $account->save();

        $platform_owner->nama = $request->nama;
        $platform_owner->jabatan = $request->jabatan;
        $platform_owner->save();

        return back()->with('message', 'Data berhasil diperbarui');
    }

    public function destroy($id)
    {
        PlatformOwner::findOrFail($id)->delete();

        return back()->with('message', 'Data berhasil dihapus');
    }
}
