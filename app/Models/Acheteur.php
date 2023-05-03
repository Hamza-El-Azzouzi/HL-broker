<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acheteur extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'tel',
        'image',
        'password'
    ];
    public function User(){
        $this->belongsTo(User::class);
    }
    public function Avis(){
        $this->hasMany(Avis::class);
    }
    public function Demande(){
        $this->hasMany(Demande::class);
    }
    public function Panier(){
        $this->hasMany(Panier::class);
    }

}
