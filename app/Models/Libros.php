<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libros extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'category_id', 'stock'];

    /**
     * Relación: Un libro pertenece a una categoría.
     */
    public function category()
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * Relación: Un libro puede estar en múltiples préstamos.
     */
    public function loans()
    {
        return $this->hasMany(Prestamos::class);
    }
}

