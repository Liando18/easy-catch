<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/SignUp');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|lowercase|email|max:50|unique:' . Account::class,
            'password' => 'required|min:8',
            'nama' => 'required',
            'jk' => 'required',
            'handphone' => 'required',
            'alamat' => 'required'
        ], [
            'email.required' => 'Email tidak boleh kosong',
            'email.lowercase' => 'Email tidak valid, berikan huruf kecil semuanya',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Password harus di isi',
            'password.min' => 'Password minimal 8 karakter',
            'nama.required' => 'Nama harus di isi',
            'jk.required' => 'Jenis Kelamin harus di isi',
            'handphone.required' => 'Nomor Handphone harus di isi',
            'alamat.required' => 'Alamat harus di isi',
        ]);

        $account = Account::create([
            'id' => Str::uuid(),
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => '4',
        ]);

        $user = User::create([
            'id' => Str::uuid(),
            'account_id' => $account->id,
            'nama' => $request->nama,
            'jk' => $request->jk,
            'handphone' => $request->handphone,
            'alamat' => $request->alamat,
            'foto' => 'user.png',
            'status' => '2'
        ]);

        event(new Registered($user));

        return back()->with('message', 'Akun berhasil terdaftar, silahkan login untuk pengalaman anda dalam platform kami');
    }
}
