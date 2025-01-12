<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $table = "store";
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'merchant_id',
        'nama',
        'deskripsi',
        'pembayaran',
        'qris',
        'alamat',
        'long',
        'let',
        'foto'
    ];

    public function product()
    {
        return $this->hasMany(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'merchant_id', 'id');
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function order_item()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->hasMany(Payment::class);
    }

    public function delivery()
    {
        return $this->hasMany(Delivery::class);
    }
}
