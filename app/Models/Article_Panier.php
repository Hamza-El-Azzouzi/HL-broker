<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article_Panier extends Model
{
    use HasFactory;
    protected $table = 'article_panier';
    protected $fillable = [
        'id_panier',
        'id_article',
       
    ];
}
