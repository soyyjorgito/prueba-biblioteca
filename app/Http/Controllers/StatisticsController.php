<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prestamos;
use App\Models\Categoria;
use DB;

class StatisticsController extends Controller
{
    /**
     * Libros más prestados
     */
    public function mostBorrowedBooks()
    {
        $books = Prestamos::select('book_id', DB::raw('COUNT(*) as total_loans'))
            ->groupBy('book_id')
            ->orderByDesc('total_loans')
            ->with('book') 
            ->take(10) 
            ->get();

        return response()->json($books);
    }

    /**
     * Usuarios más activos
     */
    public function mostActiveUsers()
    {
        $users = Prestamos::select('user_id', DB::raw('COUNT(*) as total_loans'))
            ->groupBy('user_id')
            ->orderByDesc('total_loans')
            ->with('user') 
            ->take(10) 
            ->get();

        return response()->json($users);
    }

    /**
     * Préstamos por categoría
     */
    public function loansByCategory()
    {
        $categories = \DB::table('prestamos')
            ->join('libros', 'prestamos.book_id', '=', 'libros.id')
            ->join('categorias', 'libros.category_id', '=', 'categorias.id')
            ->select('categorias.name', \DB::raw('COUNT(prestamos.id) as total_loans'))
            ->groupBy('categorias.name')
            ->orderByDesc('total_loans')
            ->get();
    
        return response()->json($categories);
    }
    
    

    /**
     * Promedio de libros prestados por usuario
     */
    public function averageLoansPerUser()
    {
        $average = Prestamos::select(DB::raw('AVG(total_loans) as average_loans'))
            ->fromSub(function ($query) {
                $query->from('prestamos')
                    ->select('user_id', DB::raw('COUNT(*) as total_loans'))
                    ->groupBy('user_id');
            }, 'user_loans')
            ->value('average_loans');

        return response()->json(['average_loans' => round($average, 2)]);
    }
}
