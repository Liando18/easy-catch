<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PesananController extends Controller
{
    public function index()
    {
        $customer_id = auth()->user()->user->id;

        $data_delivery = Delivery::with(['order.customer', 'order.order_item', 'store', 'payment'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->orderBy('status')
            ->get();

        $data_order = OrderItem::with(['order'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->get();

        return Inertia::render('Shop/Profile/Pesanan', [
            'title' => 'Pesanan Anda',
            'data_order' => $data_order,
            'data_delivery' => $data_delivery,
        ]);
    }

    public function kelolaPesanan()
    {
        $merchant_id = auth()->user()->user->id;

        $data_payment = Payment::with(['order.customer', 'store'])
            ->whereHas('store', function ($query) use ($merchant_id) {
                $query->where('merchant_id', '=', $merchant_id);
            })
            ->whereDoesntHave('delivery')
            ->orderByDesc('status')
            ->get();

        $data_order = OrderItem::with(['order.customer', 'order.payment', 'product.category', 'store'])
            ->whereHas('store', function ($query) use ($merchant_id) {
                $query->where('merchant_id', $merchant_id);
            })
            ->get();

        return Inertia::render('Shop/Profile/KelolaPesanan', [
            'title' => 'Kelola Pesanan',
            'data_order' => $data_order,
            'data_payment' => $data_payment
        ]);
    }
    public function konfirmasiPesanan($id)
    {
        $payment = Payment::with(['order.customer', 'store'])->findOrFail($id);
        $store_id = $payment->store->id;

        $data_item = OrderItem::with(['order.payment', 'product.category', 'store'])
            ->whereHas('order.payment', function ($query) use ($id) {
                $query->where('payment.id', '=', $id);
            })
            ->whereHas('store', function ($query) use ($store_id) {
                $query->where('id', '=', $store_id);
            })
            ->get();

        return Inertia::render('Shop/Profile/KonfirmasiPesanan', [
            'title' => 'Konfirmasi Pesanan',
            'data_item' => $data_item,
            'payment' => $payment
        ]);
    }

    public function storePesanan(Request $request, $id)
    {
        $request->validate([
            'order_id' => 'required',
            'store_id' => 'required',
            'payment_id' => 'required',
            'status' => 'required',
            'pengiriman' => 'required'
        ]);

        try {

            $payment = Payment::with(['order.customer', 'store'])->findOrFail($id);
            $store_id = $payment->store->id;

            $data_item = OrderItem::with(['order.payment', 'product.category', 'store'])
                ->whereHas('order.payment', function ($query) use ($id) {
                    $query->where('payment.id', '=', $id);
                })
                ->whereHas('store', function ($query) use ($store_id) {
                    $query->where('id', '=', $store_id);
                })
                ->get();

            Delivery::create([
                'id' => Str::uuid(),
                'order_id' => $request->order_id,
                'store_id' => $request->store_id,
                'payment_id' => $request->payment_id,
                'ongkir' => $request->ongkir,
                'status' => $request->status,
                'pengiriman' => $request->pengiriman,
            ]);

            foreach ($data_item as $item) {
                $product = Product::findOrFail($item->product->id);

                if ($product->stok < $item->qty) {
                    return back()->with('message', 'Stok pada Product ' . $item->product->nama . ' tidak cukup');
                }
                $product->stok = $product->stok - $item->qty;
                $product->save();
            }

            return back();
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server : ' . $e->getMessage());
        }
    }

    public function updatePesanan($id)
    {
        try {
            $data_payment = Payment::findOrFail($id);

            $data_payment->status = '3';
            $data_payment->save();

            return back()->with('message', 'Pesanan berhasil di cancel');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server : ' . $e->getMessage());
        }
    }

    public function pengiriman()
    {
        $merchant_id = auth()->user()->user->id;

        $data_delivery = Delivery::with(['order.customer', 'order.order_item', 'store', 'payment'])
            ->whereHas('store', function ($query) use ($merchant_id) {
                $query->where('merchant_id', '=', $merchant_id);
            })
            ->orderBy('status')
            ->get();

        $data_order = OrderItem::with(['order.customer', 'order.payment', 'product.category', 'store'])
            ->whereHas('store', function ($query) use ($merchant_id) {
                $query->where('merchant_id', $merchant_id);
            })
            ->get();

        return Inertia::render('Shop/Profile/Pengiriman', [
            'title' => 'Pengiriman Paket',
            'data_order' => $data_order,
            'data_delivery' => $data_delivery
        ]);
    }

    public function pengirimanView($id)
    {
        $delivery = Delivery::with(['order.customer', 'store', 'payment'])->findOrFail($id);
        $store_id = $delivery->store->id;

        $data_item = OrderItem::with(['order.delivery', 'product.category', 'store'])
            ->whereHas('order.delivery', function ($query) use ($id) {
                $query->where('delivery.id', '=', $id);
            })
            ->whereHas('store', function ($query) use ($store_id) {
                $query->where('id', '=', $store_id);
            })
            ->get();

        return Inertia::render('Shop/Profile/PengirimanView', [
            'title' => 'View Pengiriman',
            'data_item' => $data_item,
            'delivery' => $delivery
        ]);
    }

    public function pengirimanUpdate(Request $request, $id)
    {
        $request->validate([
            'status' => 'required',
            'pengiriman' => 'required',
        ], [
            'status.required' => 'Mohon pilih status pengiriman',
            'pengiriman.required' => 'Mohon pilih pengiriman'
        ]);

        try {
            $delivery = Delivery::findOrFail($id);

            $delivery->status = $request->status;
            $delivery->pengiriman = $request->pengiriman;
            $delivery->save();

            return back()->with('message', 'Data berhasil di update');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server : ' . $e->getMessage());
        }
    }
}
