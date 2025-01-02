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
        Schema::create('delivery', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->constrained('order', 'id')->cascadeOnDelete();
            $table->foreignUuid('store_id')->constrained('store', 'id')->cascadeOnDelete();
            $table->foreignUuid('payment_id')->constrained('payment', 'id')->cascadeOnDelete();
            $table->double('ongkir', 20, 6);
            $table->enum('status', ['1', '2', '3', '4']);
            $table->enum('pengiriman', ['1', '2', '3']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
