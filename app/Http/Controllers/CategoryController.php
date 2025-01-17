<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Categoria;

class CategoryController extends Controller
{
    // Mostrar todas las categorias
    public function index()
    {
        $data = Categoria::all();
        return response()->json($data,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new Categoria($request->all());
        $data -> save();
        return response()->json($data,200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Categoria::find($id);
        return response() -> json($data,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Categoria::find($id);
        $data -> fill($request->all());
        $data -> save();
        return response() -> json($data,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Categoria::find($id);
        $data->delete();
        return response()-> json("Borrado",200);
    }
}
