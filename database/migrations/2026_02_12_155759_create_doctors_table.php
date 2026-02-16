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
        Schema::create('doctors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('clinic_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('avatar_image_url')->nullable();
            $table->tinyInteger('available_from_week_day'); // 0=dom, 1=seg...6=sab
            $table->tinyInteger('available_to_week_day');
            $table->time('available_from_time'); // hh:mm:ss
            $table->time('available_to_time');
            $table->string('specialty');
            $table->integer('appointment_price_in_cents'); // preço da consulta
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
