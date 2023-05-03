<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_article',
        'description',
        'type',
        'image',
        'disponibilite',
    ];
    public function Categorie()
    {
        $this->belongsTo(Categorie::class);
    }
    public function Vendeur()
    {
        $this->belongsTo(Vendeur::class);
    }
    public function User()
    {
        $this->belongsTo(User::class);
    }
    public function Avis()
    {
        $this->hasMany(Avis::class);
    }
    public function Panier()
    {
        return $this->belongsToMany(Panier::class)
        ->using(Article_Panier::class);
    }
    public function Demande()
    {
        $this->hasMany(Demande::class);
    }

}
