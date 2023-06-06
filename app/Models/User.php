<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
 
        'name',
        'account_type',
        'email',
        'tel',
        'password',
        'image',
        'urlyoutube',
        'urlinstgram',
        'urlfacebook',
        'codezip',
        'pays',
        'city',
        'adress',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
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
