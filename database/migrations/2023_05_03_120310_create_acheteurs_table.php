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
        Schema::create('acheteurs', function (Blueprint $table) {
            $table->bigIncrements('id_acheteur');
            $table->foreignId('id_user')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate()->primary();
            $table->string('name');
            $table->string('email');
            $table->integer('tel');
            $table->binary('image');
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acheteurs');
    }
};
