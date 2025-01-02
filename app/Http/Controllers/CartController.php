<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $customer_id = auth()->user()->user->id;

        $payment = Payment::with(['order'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->where('status', '=', '1')
            ->first();

        if ($payment) {
            return redirect('/shop/payment/' . $payment->order_id);
        }

        $data_cart = CartItem::with(['cart', 'product.store'])
            ->whereHas('cart', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->get();

        return Inertia::render('Shop/Cart', [
            'title' => 'Keranjang Belanja',
            'data_cart' => $data_cart,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'qty' => 'required|integer|min:1'
        ], [
            'qty.required' => 'Jumlah beli haru di isi',
            'qty.integer' => 'Jumlah beli harus bersifat angka',
            'qty.min' => 'Jumlah beli tidak boleh 0'
        ]);
        try {
            $cart_item = CartItem::findOrFail($id);
            $product = Product::findOrFail($cart_item->product_id);

            if ($request->qty > $product->stok) {
                return back()->with('message', 'Stok tidak cukup');
            }

            $cart_item->qty = $request->qty;
            $cart_item->save();

            return back()->with('message', 'Jumlah beli berhasil di update');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server');
        }
    }

    public function destroy($id)
    {
        try {
            CartItem::findOrFail($id)->delete();
            return back()->with('message', 'Produk dihapus dari kerajang');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server');
        }
    }
}
