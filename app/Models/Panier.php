<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;
    public function User(){
        $this->belongsTo(User::class);
    }
    public function Acheteur(){
        $this->belongsTo(Acheteur::class);
    }
    public function Article(){
        return $this->hasMany(Article::class)
        ->using(Article_Panier::class);
    }
}
