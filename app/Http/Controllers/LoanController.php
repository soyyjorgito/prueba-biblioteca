<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Prestamos;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loans = Prestamos::with(['user', 'book'])->get();
        return response()->json($loans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new Prestamos($request->all());
        $data -> save();
        return response()->json($data,200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Prestamos::find($id);
        return response() -> json($data,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Prestamos::find($id);
        $data -> fill($request->all());
        $data -> save();
        return response() -> json($data,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Prestamos::find($id);
        $data->delete();
        return response()-> json("Borrado",200);
    }
}
