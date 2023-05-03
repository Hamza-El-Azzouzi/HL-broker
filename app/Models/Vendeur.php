<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendeur extends Model
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
    public function Article(){
        $this->hasMany(Article::class);
    }

}
