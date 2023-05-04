<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;


    public function Vendeur()
    {
        $this->hasMany(Vendeur::class);
    }
    public function Acheteur()
    {
        $this->hasMany(Acheteur::class);
    }
    public function Avis()
    {
        $this->hasMany(Avis::class);
    }
    public function Panier()
    {
        return $this->hasMany(Panier::class);
    }
    public function Demande()
    {
        $this->hasMany(Demande::class);
    }
    public function Article()
    {
        $this->hasMany(Article::class);
    }
}
