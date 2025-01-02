<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('merchant_id')->constrained('user', 'id')->cascadeOnDelete();
            $table->foreignUuid('store_id')->constrained('store', 'id')->cascadeOnDelete();
            $table->foreignUuid('category_id')->constrained('category', 'id')->cascadeOnDelete();
            $table->string('nama', 50);
            $table->text('deskripsi');
            $table->double('harga');
            $table->integer('stok');
            $table->text('foto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
