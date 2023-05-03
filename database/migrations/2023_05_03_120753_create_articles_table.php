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
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id_article');
            $table->foreignId('id_categorie')->references('id_categorie')->on('categories')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_user')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_vendeur')->references('id_vendeur')->on('vendeurs')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('name_article');
            $table->string('description');
            $table->string('type');
            $table->binary('image');
            $table->boolean('disponibilite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
