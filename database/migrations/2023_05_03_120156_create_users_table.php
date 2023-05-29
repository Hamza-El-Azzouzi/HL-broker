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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->string('account_type');
            $table->integer('tel');
            $table->binary('image')->nullable();
            $table->string('adress')->nullable();
            $table->string('city')->nullable();
            $table->string('pays')->nullable();
            $table->integer('codezip')->nullable();
            $table->string('urlfacebook')->nullable();
            $table->string('urlyoutube')->nullable();
            $table->string('urlinstegram')->nullable();
            $table->string('description')->nullable();
           $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
