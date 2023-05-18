<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    use HasFactory;

    public function User(){
        $this->belongsTo(User::class);
    }
    public function Article(){
        $this->belongsTo(Article::class);
    }

}
