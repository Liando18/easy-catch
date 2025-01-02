<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
class PembayaranController extends Controller
{

    public function index()
    {
        $customer_id = auth()->user()->user->id;

        $data_payment = Payment::with(['order', 'delivery'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->orderByDesc('created_at')
            ->get();

        $data_order = OrderItem::with(['order.customer', 'order.payment', 'product.category', 'store'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', $customer_id);
            })
            ->get();

        return Inertia::render('Shop/Profile/Pembayaran', [
            'title' => 'Pembayaran Anda',
            'data_order' => $data_order,
            'data_payment' => $data_payment
        ]);
    }

    public function pembayaranView($id)
    {
        $customer_id = auth()->user()->user->id;

        Cart::where('customer_id', '=', $customer_id)->delete();

        $data_payment = Payment::with(['order', 'store'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->where('order_id', '=', $id)
            ->orderBy('status')
            ->get();

        $data_order = OrderItem::with(['order', 'product'])
            ->whereHas('order', function ($query) use ($customer_id) {
                $query->where('customer_id', '=', $customer_id);
            })
            ->where('order_id', '=', $id)
            ->get();

        $order = Order::with('payment')
            ->where('customer_id', '=', $customer_id)
            ->whereHas('payment', function ($query) use ($id) {
                $query->where('order_id', '=', $id);
            })
            ->orderByDesc('created_at')
            ->first();

        return Inertia::render('Shop/Payment', [
            'title' => 'Pembayaran Paket Anda',
            'data_payment' => $data_payment,
            'data_order' => $data_order,
            'order' => $order
        ]);
    }

    public function detail($id)
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

        return Inertia::render('Shop/Profile/PembayaranDetail', [
            'title' => 'Detail Pesanan Anda',
            'data_item' => $data_item,
            'payment' => $payment
        ]);
    }

    public function buktiPembayaran(Request $request, $id)
    {
        $request->validate([
            'bukti_pembayaran' => 'nullable|image|mimes:jpeg,png,jpg|max:5090',
        ], [
            'bukti_pembayaran.image' => 'Foto yang diupload harus berupa gambar',
            'bukti_pembayaran.mimes' => 'Format foto bukti_pembayaran yang diizinkan adalah jpeg, png, jpg',
            'bukti_pembayaran.max' => 'Ukuran foto maksimal 5MB',
        ]);

        try {
            $payment = Payment::findOrFail($id);

            if ($request->hasFile('bukti_pembayaran')) {
                if ($payment->bukti_pembayaran && file_exists(public_path('img/payment/' . $payment->bukti_pembayaran))) {
                    unlink(public_path('img/payment/' . $payment->bukti_pembayaran));
                }

                $fileName = time() . "_" . $request->file('bukti_pembayaran')->getClientOriginalName();
                $request->file('bukti_pembayaran')->move(public_path('img/payment/'), $fileName);

                $payment->bukti_pembayaran = $fileName;
                $payment->status = '2';
                $payment->save();
            }

            return back()->with('message', 'Berhasil upload bukti pembayaran, mohon tunggu konfirmasi dari pihak toko untuk proses pengirim.');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server : ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'bukti_pembayaran' => 'nullable|image|mimes:jpeg,png,jpg|max:5090',
        ], [
            'bukti_pembayaran.image' => 'Foto yang diupload harus berupa gambar',
            'bukti_pembayaran.mimes' => 'Format foto bukti_pembayaran yang diizinkan adalah jpeg, png, jpg',
            'bukti_pembayaran.max' => 'Ukuran foto maksimal 5MB',
        ]);

        try {
            $payment = Payment::findOrFail($id);

            if ($request->hasFile('bukti_pembayaran')) {
                if ($payment->bukti_pembayaran && file_exists(public_path('img/payment/' . $payment->bukti_pembayaran))) {
                    unlink(public_path('img/payment/' . $payment->bukti_pembayaran));
                }

                $fileName = time() . "_" . $request->file('bukti_pembayaran')->getClientOriginalName();
                $request->file('bukti_pembayaran')->move(public_path('img/payment/'), $fileName);

                $payment->bukti_pembayaran = $fileName;
                $payment->status = '2';
                $payment->save();
            }

            return back()->with('message', 'Berhasil upload bukti pembayaran, mohon tunggu konfirmasi dari pihak toko untuk proses pengirim.');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server : ' . $e->getMessage());
        }
    }
}
