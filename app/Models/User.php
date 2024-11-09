<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'prefixname',
        'firstname',
        'middlename',
        'lastname',
        'suffixname',
        'username',
        'email',
        'password',
        'photo'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getFullnameAttribute()
    {
        return ucwords($this->firstname) . ' ' . $this->getMiddleinitialAttribute() . ' ' . ucwords($this->lastname);
    }

    public function getMiddleinitialAttribute()
    {
        if ($this->middlename) {
            $initial = mb_substr($this->middlename, 0, 1);
            return strtoupper($initial) . ".";
        }
        return null;
    }

    public function getAvatarAttribute()
    {
        return $this->photo ? asset('storage/' . $this->photo) : null;
    }
}
