<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    // Mostrar listado de usuarios
    public function index()
    {
        $data = User::all();
        return response() -> json($data,200);
    }

    // Guardar nuevo usuario
    public function store(Request $request)
    {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
        'role' => 'required|in:admin,user', 
    ]);

    $data = new User([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password), 
        'role' => $request->role,
    ]);

    $data->save();

    return response()->json($data, 201); 
}

    // Mostrar usuario especifico
    public function show(string $id)
    {
        $data = User::find($id);
        return response() -> json($data,200);
    }

    // Actualizar usuario
    public function update(Request $request, string $id)
    {
        $data = User::find($id);
        $data -> fill($request->all());
        $data -> save();
        return response() -> json($data,200);
    }

    // Borrar usuario
    public function destroy(string $id)
    {
        $data = User::find($id);
        $data->delete();
        return response()-> json($data,200);
    }
}
