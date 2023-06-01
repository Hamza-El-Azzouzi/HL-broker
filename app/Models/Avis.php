<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;
    protected $fillable = [
        'nbr_etoile',
        'avis',
        'id_user',
        'id_article',

    ];
    public function User(){
        $this->belongsTo(User::class);
    }
    public function Article(){
        $this->belongsTo(Article::class);
    }
}
