<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Libros;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Libros::with(['category'])->get();
        return response()->json($data,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new Libros($request->all());
        $data -> save();
        return response()->json($data,200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Libros::find($id);
        return response() -> json($data,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Libros::find($id);
        $data -> fill($request->all());
        $data -> save();
        return response() -> json($data,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Libros::find($id);
        $data->delete();
        return response()-> json("Borrado",200);
    }


    // Gestionar Stock
    // Pedir libro
    public function borrowBook(Request $request, string $id)
    {
        // Buscar el libro por su ID
        $book = Libros::find($id);
    
        // Verificar si el libro existe
        if (!$book) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }
    
        // Verificar si hay stock disponible
        if ($book->stock > 0) {
            // Disminuir el stock en 1
            $book->stock -= 1;
            $book->save();
    
            return response()->json(['message' => 'Préstamo realizado correctamente', 'stock' => $book->stock], 200);
        } else {
            return response()->json(['message' => 'No hay libros disponibles'], 400);
        }
    }
    
    
    // Devolver libro
    public function returnBook(Request $request, string $id)
    {
    // Buscar el libro por su ID
    $book = Libros::find($id);

    // Verificar si el libro existe
    if (!$book) {
        return response()->json(['message' => 'Libro no encontrado'], 404);
    }

    // Aumentar el stock en 1
    $book->stock += 1;
    $book->save();

    return response()->json(['message' => 'Devolución realizada correctamente', 'stock' => $book->stock], 200);
    }

}
