<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeacrhController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = Product::with(['category']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', '%' . $search . '%')
                    ->orWhere('deskripsi', 'like', '%' . $search . '%')
                    ->orWhere('harga', 'like', '%' . $search . '%')
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('nama', 'like', '%' . $search . '%');
                    });
            });
        }

        $data_product = $query->orderByDesc('updated_at')->paginate(8);

        if ($data_product->isEmpty() && $search) {
            $otherProducts = Product::with(['category'])->inRandomOrder()->take(8)->get();
        } else {
            $otherProducts = Product::with(['category'])->inRandomOrder()->take(8)->get();
        }

        return Inertia::render('Shop/Search', [
            'data_product' => $data_product,
            'otherProducts' => $otherProducts,
            'initialSearch' => $search ?? '',
        ]);
    }
}
