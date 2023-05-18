<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_categorie',
        'id_user',
        'id_vendeur',
        'id_acheteur',
        'name_article',
        'description',
        'type',
        'prix',
        'image1',
        'image2',
        'image3',
        'image4',
        'disponibilite',
    ];
    public function Categorie()
    {
        $this->belongsTo(Categorie::class);
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
    public function Images(){
        return $this->hasMany(Image::class);
    }
}
