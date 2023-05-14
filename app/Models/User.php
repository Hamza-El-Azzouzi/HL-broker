<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_acheteur',
        'id_vendeur',
        'name',
        'email',
        'tel',
        'image',
        'password'
    ];
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
