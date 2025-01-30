<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function index()
    {
        $merchant_id = auth()->user()->user->id;
        $data_category = Category::all();
        $data_store = Store::where('merchant_id', '=', $merchant_id)->first();
        $data_product = Product::with(['category'])->where('merchant_id', '=', $merchant_id)->get();

        return Inertia::render('Shop/Profile/KelolaProduct', [
            'data_category' => $data_category,
            'data_product' => $data_product,
            'data_store' => $data_store,
            'title' => 'Data Product'
        ]);
    }

    public function store(Request $request)
    {
        // Validasi
        $request->validate([
            'category_id' => 'required',
            'nama' => 'required',
            'deskripsi' => 'required',
            'harga' => 'required',
            'stok' => 'required',
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ], [
            'category_id.required' => 'Kategori harus dipilih',
            'nama.required' => 'Nama tidak boleh kosong',
            'deskripsi.required' => 'Deskripsi tidak boleh kosong',
            'harga.required' => 'Harga tidak boleh kosong',
            'stok.required' => 'Stok tidak boleh kosong',
            'foto.image' => 'File yang diupload harus berupa gambar',
            'foto.mimes' => 'Format foto yang diizinkan adalah jpeg, png, jpg',
            'foto.max' => 'Ukuran foto maksimal 2MB',
        ]);

        try {
            $path = $_SERVER['DOCUMENT_ROOT'] . "/img/product/";

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            $existingProduct = Product::where('nama', $request->nama)->first();
            if ($existingProduct && $existingProduct->foto) {
                $oldFile = $path . $existingProduct->foto;
                if (file_exists($oldFile)) {
                    unlink($oldFile);
                }
            }

            $fileName = time() . "_" . $request->nama . "_" . $request->file('foto')->getClientOriginalName();
            $request->file('foto')->move($path, $fileName);

            Product::create([
                'id' => Str::uuid(),
                'merchant_id' => $request->merchant_id,
                'category_id' => $request->category_id,
                'store_id' => $request->store_id,
                'nama' => $request->nama,
                'deskripsi' => $request->deskripsi,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'foto' => $fileName,
            ]);

            return back()->with('message', 'Data produk anda berhasil ditambahkan');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server: ' . $e->getMessage());
        }
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required',
            'nama' => 'required',
            'deskripsi' => 'required',
            'harga' => 'required',
            'stok' => 'required',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ], [
            'category_id.required' => 'Kategori harus dipilih',
            'nama.required' => 'Nama tidak boleh kosong',
            'deskripsi.required' => 'Deskripsi tidak boleh kosong',
            'harga.required' => 'Harga tidak boleh kosong',
            'foto.image' => 'File yang diupload harus berupa gambar',
            'foto.mimes' => 'Format foto yang diizinkan adalah jpeg, png, jpg',
            'foto.max' => 'Ukuran foto maksimal 2MB',
        ]);

        try {
            $product = Product::findOrFail($id);

            $path = $_SERVER['DOCUMENT_ROOT'] . "/img/product/";

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            if ($request->hasFile('foto')) {
                if ($product->foto) {
                    $oldFile = $path . $product->foto;
                    if (file_exists($oldFile)) {
                        unlink($oldFile);
                    }
                }

                $fileName = time() . "_" . $request->nama . "_" . $request->file('foto')->getClientOriginalName();
                $request->file('foto')->move($path, $fileName);

                $product->foto = $fileName;
            }

            $product->category_id = $request->category_id;
            $product->nama = $request->nama;
            $product->deskripsi = $request->deskripsi;
            $product->harga = $request->harga;
            $product->stok = $request->stok;
            $product->save();

            return back()->with('message', 'Data produk anda berhasil diperbarui');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server: ' . $e->getMessage());
        }
    }


    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);

            // Path folder di cPanel (public_html/img/product/)
            $path = $_SERVER['DOCUMENT_ROOT'] . "/img/product/";

            // Cek apakah folder sudah ada, jika tidak buat baru
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            // Hapus foto jika ada
            if ($product->foto) {
                $filePath = $path . $product->foto;
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }

            // Hapus data produk dari database
            $product->delete();

            return back()->with('message', 'Data produk anda berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server: ' . $e->getMessage());
        }
    }


    public function productView()
    {
        return Inertia::render('Shop/ProductView');
    }
}
