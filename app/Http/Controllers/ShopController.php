<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ShopController extends Controller
{
    public function index()
    {
        $data_category = Category::all();
        $data_rekomendasi = Product::orderByDesc('updated_at')->limit(4)->get();
        $data_product = Product::with(['category'])->orderByDesc('created_at')->paginate(8);

        return Inertia::render('Shop/Shop', [
            'data_category' => $data_category,
            'data_rekomendasi' => $data_rekomendasi,
            'data_product' => $data_product
        ]);
    }

    public function storeCart(Request $request, $id)
    {
        $request->validate([
            'customer_id' => 'required',
            'qty' => 'required|integer|min:1'
        ], [
            'customer_id.required' => 'Customer tidak ditemukan',
            'qty.required' => 'Jumlah beli tidak boleh kosong',
            'qty.integer' => 'Jumlah beli harus berupa angka',
            'qty.min' => 'Jumlah beli minimal 1'
        ]);

        try {
            $cart = Cart::where('customer_id', $request->customer_id)->first();

            if (!$cart) {
                $cart = Cart::create([
                    'id' => Str::uuid(),
                    'customer_id' => $request->customer_id
                ]);
            }

            $cart_item = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $id)
                ->first();

            if (!$cart_item) {
                CartItem::create([
                    'id' => Str::uuid(),
                    'cart_id' => $cart->id,
                    'product_id' => $id,
                    'qty' => $request->qty
                ]);
            } else {
                $cart_item->qty += $request->qty;
                $cart_item->save();
            }

            return back()->with('message', 'Produk berhasil masuk keranjang');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server: ' . $e->getMessage());
        }
    }


    public function productView($id)
    {
        $data_product = Product::with(['category', 'store'])->where('id', '=', $id)->first();

        return Inertia::render('Shop/ProductView', [
            'data_product' => $data_product
        ]);
    }
}
