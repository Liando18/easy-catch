<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataAksesController;
use App\Http\Controllers\DataCustomerController;
use App\Http\Controllers\DataMerchantController;
use App\Http\Controllers\DataPengirimanController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeacrhController;
use App\Http\Controllers\ShopController;
use App\Models\Payment;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/shop', [ShopController::class, 'index']);

Route::get('/shop/store', [MerchantController::class, 'merchant'])->name('store');
Route::get('/shop/store/{id}', [MerchantController::class, 'merchantView'])->name('store');

Route::get('/shop/product-detail/{id}', [ShopController::class, 'productView']);
Route::post('/shop/product-detail/{id}', [ShopController::class, 'storeCart'])->middleware(['auth', 'verified']);

Route::get('/shop/category/{id}', [CategoryController::class, 'categoryView'])->name('category');

Route::get('/shop/search', [SeacrhController::class, 'index'])->name('seacrh');

Route::get('/shop/keranjang', [CartController::class, 'index'])->middleware(['auth', 'verified']);
Route::put('/shop/keranjang/{id}/edit', [CartController::class, 'update'])->middleware(['auth', 'verified']);
Route::delete('/shop/keranjang/{id}/delete', [CartController::class, 'destroy'])->middleware(['auth', 'verified']);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/shop/checkout', [CheckoutController::class, 'index'])->name('checkout');
    Route::post('/shop/checkout/order', [CheckoutController::class, 'order'])->name('checkout');

    Route::get('/shop/payment', [PembayaranController::class, 'index'])->name('payment');
    Route::get('/shop/payment/{id}', [PembayaranController::class, 'pembayaranView'])->name('payment');
    Route::get('/shop/payment/{id}/detail', [PembayaranController::class, 'detail'])->name('payment');
    Route::post('/shop/payment/{id}', [PembayaranController::class, 'buktiPembayaran'])->name('payment');
    Route::post('/shop/payment/{id}/update', [PembayaranController::class, 'update'])->name('payment');

    Route::get('/shop/profile', [DataCustomerController::class, 'editProfile'])->name('edit_profile');
    Route::post('/shop/profile/{id}', [DataCustomerController::class, 'updateProfile'])->name('edit_profile');

    Route::get('/shop/toko', [MerchantController::class, 'index'])->name('merchant');
    Route::post('/shop/toko/{id}', [MerchantController::class, 'update'])->name('merchant');

    Route::get('/shop/buat-toko', [MerchantController::class, 'create'])->name('merchant');
    Route::post('/shop/buat-toko/{id}', [MerchantController::class, 'store'])->name('merchant');

    Route::get('/shop/kelola-produk', [ProductController::class, 'index'])->name('product');
    Route::post('/shop/kelola-produk', [ProductController::class, 'store'])->name('product');
    Route::post('/shop/kelola-produk/{id}', [ProductController::class, 'update'])->name('product');
    Route::delete('/shop/kelola-produk/{id}', [ProductController::class, 'destroy'])->name('product');

    Route::get('/shop/pesanan', [PesananController::class, 'index'])->name('pesanan');

    Route::get('/shop/kelola-pesanan', [PesananController::class, 'kelolaPesanan'])->name('pesanan');
    Route::get('/shop/kelola-pesanan/{id}/konfirmasi', [PesananController::class, 'konfirmasiPesanan'])->name('pesanan');
    Route::post('/shop/kelola-pesanan/{id}/create', [PesananController::class, 'storePesanan'])->name('pesanan');
    Route::put('/shop/kelola-pesanan/{id}/update', [PesananController::class, 'updatePesanan'])->name('pesanan');

    Route::get('/shop/pengiriman', [PesananController::class, 'pengiriman'])->name('pengiriman');
    Route::get('/shop/pengiriman/{id}/view', [PesananController::class, 'pengirimanView'])->name('pengiriman');
    Route::put('/shop/pengiriman/{id}/update', [PesananController::class, 'pengirimanUpdate'])->name('pengiriman');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/dashboard/data_akses', [DataAksesController::class, 'index'])->name('data_akses');
    Route::post('/dashboard/data_akses', [DataAksesController::class, 'store'])->name('data_akses');
    Route::put('/dashboard/data_akses/{id}', [DataAksesController::class, 'update'])->name('data_akses');
    Route::delete('/dashboard/data_akses/{id}', [DataAksesController::class, 'destroy'])->name('data_akses');

    Route::get('/dashboard/data_category', [CategoryController::class, 'index'])->name('data_category');
    Route::post('/dashboard/data_category', [CategoryController::class, 'store'])->name('data_category');
    Route::put('/dashboard/data_category/{id}', [CategoryController::class, 'update'])->name('data_category');
    Route::delete('/dashboard/data_category/{id}', [CategoryController::class, 'destroy'])->name('data_category');

    Route::get('/dashboard/data_merchant', [DataMerchantController::class, 'index'])->name('data_merchant');
    Route::put('/dashboard/data_merchant/{id}', [DataMerchantController::class, 'update'])->name('data_merchant');
    Route::delete('/dashboard/data_merchant/{id}', [DataMerchantController::class, 'destroy'])->name('data_merchant');

    Route::get('/dashboard/data_customer', [DataCustomerController::class, 'index'])->name('data_customer');
    Route::put('/dashboard/data_customer/{id}', [DataCustomerController::class, 'update'])->name('data_customer');
    Route::delete('/dashboard/data_customer/{id}', [DataCustomerController::class, 'destroy'])->name('data_customer');

    Route::get('/dashboard/data_pengiriman', [DataPengirimanController::class, 'index'])->name('data_pengiriman');
    Route::get('/dashboard/data_pengiriman/{id}/view', [DataPengirimanController::class, 'show'])->name('data_pengiriman');
    Route::put('/dashboard/data_pengiriman/{id}/update', [DataPengirimanController::class, 'update'])->name('data_pengiriman');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


require __DIR__ . '/auth.php';
