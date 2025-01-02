<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = "product";
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'merchant_id',
        'store_id',
        'category_id',
        'nama',
        'deskripsi',
        'harga',
        'stok',
        'foto'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cart()
    {
        return $this->hasMany(Cart::class);
    }

    public function order_item()
    {
        return $this->hasMany(OrderItem::class);
    }
}
