<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['category', 'thought_id'];

    public function thoughts()
    {
        return $this->belongsToMany(Thought::class, 'category_thoughts');
    }
}
