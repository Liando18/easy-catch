<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function index()
    {
        $customer_id = auth()->user()->user->id;

        $carts = Cart::where('customer_id', '=', $customer_id)->first();
        $data_cart = CartItem::with(['cart', 'product.store'])
            ->whereHas('cart', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->get();

        $orders = Payment::with(['order'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->where('status', '=', '1')
            ->orderBy('created_at')
            ->first();

        return Inertia::render('Shop/Checkout', [
            'title' => 'Checkout',
            'orders' => $orders,
            'carts' => $carts,
            'data_cart' => $data_cart,
        ]);
    }

    public function order(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'alamat' => 'required',
            'lat' => 'required',
            'long' => 'required',
        ], [
            'alamat.required' => 'Alamat anda belum lengkap, mohon lengkapi terlebih dahulu',
            'lat.required' => 'Pilih titik koordinat anda pada peta',
            'long.required' => 'Pilih titik koordinat anda pada peta',
        ]);

        try {
            $customer_id = auth()->user()->user->id;

            $cart = CartItem::with(['cart', 'product.store'])
                ->whereHas('cart', function ($query) use ($customer_id) {
                    $query->where('customer_id', '=', $customer_id);
                })
                ->get();

            $order = Order::create([
                'id' => Str::uuid(),
                'customer_id' => $customer_id,
                'alamat' => $request->alamat,
                'let' => $request->lat,
                'long' => $request->long,
            ]);

            foreach ($cart as $item) {
                OrderItem::create([
                    'id' => Str::uuid(),
                    'order_id' => $order->id,
                    'product_id' => $item->product->id,
                    'store_id' => $item->product->store->id,
                    'qty' => $item->qty,
                    'harga' => $item->product->harga,
                ]);
            }

            $itemsByStore = $cart->groupBy(function ($item) {
                return $item->product->store->id;
            });

            foreach ($itemsByStore as $storeId => $items) {
                Payment::create([
                    'id' => Str::uuid(),
                    'order_id' => $order->id,
                    'store_id' => $storeId,
                    'bukti_pembayaran' => '',
                    'status' => '1',
                    'rute' => '1',
                ]);
            }

            return back()->with('message', 'Data alamat berhasil ditambahkan, silahkan lanjutkan ke proses pembayaran');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server: ' . $e->getMessage());
        }
    }
}
