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
            $table->string('description',2000);
            $table->integer('prix');
            $table->string('image');
            $table->text('localisation');
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
