<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * Relación: Una categoría tiene muchos libros.
     */
    public function books()
    {
        return $this->hasMany(Libros::class);
    }
}
