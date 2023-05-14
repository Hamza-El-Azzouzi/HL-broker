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
            $table->foreignId('id_categorie')->references('id_categorie')->on('categories')->cascadeOnDelete()->cascadeOnUpdate()->nullable();
            $table->foreignId('id_user')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('name_article');
            $table->string('description');
            $table->integer('prix');
            $table->binary('Image1')->nullable();
            $table->binary('Image2')->nullable();
            $table->binary('Image3')->nullable();
            $table->binary('Image4')->nullable();
            $table->string('type');
            $table->string('disponibilite');
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
