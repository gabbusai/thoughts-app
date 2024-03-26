<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $table = 'likes';
    protected $guarded = [];
    protected $fillable = [
        'user_id',
        'thought_id',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function thought()
    {
        return $this->belongsTo(Thought::class);
    }

}
