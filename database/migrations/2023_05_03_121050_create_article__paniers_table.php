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
        Schema::create('article_panier', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('id_panier')->references('id_panier')->on('paniers')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_article')->references('id_article')->on('articles')->cascadeOnDelete()->cascadeOnUpdate();
            // $table->primary(['id_panier','id_article']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_paniers');
    }


    
};
