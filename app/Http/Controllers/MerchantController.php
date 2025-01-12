<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class MerchantController extends Controller
{
    public function index()
    {
        $merchant_id = auth()->user()->user->id;
        $data_toko = Store::where('merchant_id', '=', $merchant_id)->first();

        if ($data_toko) {
            return Inertia::render('Shop/Profile/Store', [
                'title' => "Kelola Data Toko Anda",
                'data_toko' => $data_toko
            ]);
        } else {
            return Inertia::render('Shop/Profile/Profile');
        }
    }

    public function create()
    {
        $merchant_id = auth()->user()->user->id;
        $data_toko = Store::where('merchant_id', '=', $merchant_id)->first();

        if ($data_toko) {
            return Inertia::render('Shop/Profile/Store', [
                'title' => "Kelola Data Toko Anda",
                'data_toko' => $data_toko
            ]);
        } else {
            return Inertia::render('Shop/Profile/CreateStore', [
                'title' => "Formulir Pembuatan Toko",
            ]);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'merchant_id' => 'required',
            'nama' => 'required|unique:' . Store::class,
            'deskripsi' => 'required',
            'pembayaran' => 'required',
            'qris' => 'required',
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:1024',
            'alamat' => 'required',
            'long' => 'required',
            'let' => 'required',
        ], [
            'merchant_id.required' => 'Akun tidak ditemukan',
            'nama.unique' => 'Nama sudah terdaftar',
            'nama.required' => 'Nama harus di isi',
            'deskripsi.required' => 'Deskripsi harus di isi',
            'pembayaran.required' => 'Nama media pembayaran harus di isi',
            'qris.required' => 'Nomor Rekening harus di isi',
            'foto.image' => 'File yang diupload harus berupa gambar',
            'foto.mimes' => 'Format foto yang diizinkan adalah jpeg, png, jpg',
            'foto.max' => 'Ukuran foto maksimal 1MB',
            'alamat.required' => 'Alamat tidak boleh kosong',
            'long.required' => 'Long tidak boleh kosong',
            'let.required' => 'Let tidak boleh kosong',
        ]);

        if ($request->foto && file_exists(public_path('img/store/' . $request->foto))) {
            unlink(public_path('img/store/' . $request->foto));
        }

        $fileName = time() . "_" . $request->nama . "-" . $request->file('foto')->getClientOriginalName();
        $request->file('foto')->move(public_path('img/store/'), $fileName);

        Account::findOrFail($request->account_id)->update([
            'role' => '3'
        ]);

        User::findOrFail($request->merchant_id)->update([
            'status' => '1'
        ]);

        Store::create([
            'id' => Str::uuid(),
            'merchant_id' => $request->merchant_id,
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'pembayaran' => $request->pembayaran,
            'qris' => $request->qris,
            'foto' => $fileName,
            'alamat' => $request->alamat,
            'long' => $request->long,
            'let' => $request->let,
        ]);

        return back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|unique:store,nama,' . $id,
            'deskripsi' => 'required',
            'pembayaran' => 'required',
            'qris' => 'required',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:5090',
            'alamat' => 'required',
            'long' => 'required',
            'let' => 'required',
        ], [
            'nama.unique' => 'Nama sudah terdaftar',
            'nama.required' => 'Nama harus di isi',
            'deskripsi.required' => 'Deskripsi harus di isi',
            'pembayaran.required' => 'Nama media pembayaran harus di isi',
            'foto.image' => 'File yang diupload harus berupa gambar',
            'foto.mimes' => 'Format foto yang diizinkan adalah jpeg, png, jpg',
            'foto.max' => 'Ukuran foto maksimal 5MB',
            'alamat.required' => 'Alamat tidak boleh kosong',
            'long.required' => 'Long tidak boleh kosong',
            'let.required' => 'Let tidak boleh kosong',
        ]);

        $store = Store::findOrFail($id);

        if ($request->hasFile('foto')) {
            if ($store->foto && file_exists(public_path('img/store/' . $store->foto))) {
                unlink(public_path('img/store/' . $store->foto));
            }

            $fileName = $request->nama . "-" . $request->file('foto')->getClientOriginalName();
            $request->file('foto')->move(public_path('img/store/'), $fileName);

            $store->foto = $fileName;
        }

        $store->nama = $request->nama;
        $store->deskripsi = $request->deskripsi;
        $store->pembayaran = $request->pembayaran;
        $store->qris = $request->qris;
        $store->alamat = $request->alamat;
        $store->long = $request->long;
        $store->let = $request->let;
        $store->save();

        return back()->with('message', 'Data toko berhasil diperbarui');
    }

    public function merchant()
    {
        $data_toko = Store::all();

        return Inertia::render('Shop/Merchant', [
            'title' => 'Toko',
            'data_toko' => $data_toko,
        ]);
    }

    public function merchantView($id)
    {
        $data_toko = Store::with('user')->findOrFail($id);
        $data_kategori = Category::all();
        $data_produk = Product::with('category')
            ->where('store_id', '=', $id)
            ->get();

        return Inertia::render('Shop/MerchantView', [
            'title' => 'View Toko',
            'data_toko' => $data_toko,
            'data_kategori' => $data_kategori,
            'data_produk' => $data_produk,

        ]);
    }
}
