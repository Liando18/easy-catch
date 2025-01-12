<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataPengirimanController extends Controller
{
    public function index()
    {
        $data_delivery = Delivery::with(['order.customer', 'order.order_item', 'store', 'payment'])
            ->orderBy('status')
            ->get();

        $data_order = OrderItem::with(['order.customer', 'order.payment', 'product.category', 'store'])
            ->get();

        return Inertia::render('Dashboard/DataPengiriman', [
            'title' => 'Pengiriman Paket',
            'data_order' => $data_order,
            'data_delivery' => $data_delivery
        ]);
    }

    public function show($id)
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

        return Inertia::render('Dashboard/DataPengirimanView', [
            'title' => 'View Pengiriman',
            'data_item' => $data_item,
            'delivery' => $delivery
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required',
        ], [
            'status.required' => 'Mohon pilih status pengiriman',
        ]);

        try {
            $delivery = Delivery::findOrFail($id);

            $delivery->status = $request->status;
            $delivery->save();

            return back()->with('message', 'Data berhasil di update');
        } catch (\Exception $e) {
            return back()->with('message', 'Ada kesalahan pada server : ' . $e->getMessage());
        }
    }
}
