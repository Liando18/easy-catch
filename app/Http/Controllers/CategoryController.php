<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $data_category = Category::all();

        return Inertia::render('Dashboard/DataCategory', [
            'data_category' => $data_category,
            'title' => 'Data Kategori'
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|unique:category,nama',
        ], [
            'nama.required' => 'Nama tidak boleh kosong',
            'nama.unique' => 'Nama sudah ada',
        ]);

        Category::create([
            'id' => Str::uuid(),
            'nama' => $request->nama,
        ]);

        return back()->with('message', 'Data berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|unique:category,id,' . $id,
        ], [
            'nama.required' => 'Nama tidak boleh kosong',
            'nama.unique' => 'Nama sudah ada',
        ]);

        $category = Category::findOrFail($id);

        $category->nama = $request->nama;
        $category->save();

        return back()->with('message', 'Data berhasil diperbarui');
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();

        return back()->with('message', 'Data berhasil dihapus');
    }

    public function categoryView($id)
    {
        $category = Category::findOrFail($id);
        $data_category = Category::all();
        $data_product = Product::with('category')
            ->where('category_id', '=', $id)
            ->get();

        return Inertia::render('Shop/Category', [
            'title' => 'Kategori',
            'category' => $category,
            'data_category' => $data_category,
            'data_product' => $data_product
        ]);
    }
}
