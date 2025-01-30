<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DataCustomerController extends Controller
{
    public function index()
    {
        $data_customer = User::with(['account'])->where("status", "=", "2")->get();

        return Inertia::render('Dashboard/DataCustomer', [
            'title' => "Data Customer",
            "data_customer" => $data_customer
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

    public function editProfile()
    {
        return Inertia::render('Shop/Profile/Profile', [
            'title' => "Profile",
        ]);
    }

    public function updateProfile(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email|lowercase|unique:account,id,' . $request->account_id,
            'password' => 'nullable|min:8',
            'nama' => 'required',
            'jk' => 'required',
            'handphone' => 'required',
            'alamat' => 'required',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ], [
            'email.required' => 'Email tidak boleh kosong',
            'email.lowercase' => 'Email tidak valid, berikan huruf kecil semuanya',
            'email.unique' => 'Email sudah terdaftar',
            'password.min' => 'Password minimal 8 karakter',
            'nama.required' => 'Nama harus di isi',
            'jk.required' => 'Jenis Kelamin harus di isi',
            'handphone.required' => 'Nomor Handphone harus di isi',
            'alamat.required' => 'Alamat harus di isi',
            'foto.image' => 'File yang diupload harus berupa gambar',
            'foto.mimes' => 'Format foto yang diizinkan adalah jpeg, png, jpg',
            'foto.max' => 'Ukuran foto maksimal 2MB',
        ]);

        $customer = User::findOrFail($id);
        $account = Account::findOrFail($customer->account_id);

        $account->email = $request->email;
        if ($request->password) {
            $account->password = Hash::make($request->password);
        }
        $account->save();

        $path = $_SERVER['DOCUMENT_ROOT'] . "/img/user/";

        if ($request->hasFile('foto')) {
            $fileName = time() . "_" . $request->file('foto')->getClientOriginalName();
            $request->file('foto')->move($path, $fileName);
            $customer->foto = $fileName;
        }

        $customer->nama = $request->nama;
        $customer->jk = $request->jk;
        $customer->handphone = $request->handphone;
        $customer->alamat = $request->alamat;
        $customer->save();

        return back()->with('message', 'Data Akun anda berhasil diperbarui');
    }
}
