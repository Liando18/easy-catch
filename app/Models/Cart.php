<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'cart';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'customer_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cart_item()
    {
        return $this->hasMany(CartItem::class);
    }
}
