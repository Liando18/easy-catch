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
        Schema::create('store', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('merchant_id')->constrained('user', 'id')->cascadeOnDelete();
            $table->string('nama', 50);
            $table->text('deskripsi');
            $table->string('qris', 50);
            $table->text('foto');
            $table->text('alamat');
            $table->double('long', 20, 14);
            $table->double('let', 20, 14);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
