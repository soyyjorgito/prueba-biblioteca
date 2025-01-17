import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import ClientLayout from '../layouts/ClientLayout';

// Public
import Home from '../pages/public/Home';
import ProtectedRoutes from '../pages/auth/ProtectedRoutes';

// Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Private Admin
import Dashboard from '../pages/admin/Dashboard';
import UsersAll from '../pages/admin/components/users/UsersAll';
import CategoriesList from '../pages/admin/components/category/CategoriesList';
import BooksList from '../pages/admin/components/books/BooksList';
import LoansList from '../pages/admin/components/loans/LoansList';
import StatisticsList from '../pages/admin/components/stadistics/StatisticsList';

// Private Client
import ClientDashboard from '../pages/client/ClientDashboard';
import ClientBooksList from '../pages/client/books/ClientBooksList';
import ClientLoansList from '../pages/client/loans/ClientLoansList';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<Home/>} />
                    <Route path ="/login" element ={<Login/>}/>
                    <Route path ="/register" element ={<Register/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/admin" element={<AdminLayout/>}>
                        <Route index element={<Dashboard/>} />
                        <Route path="users" element={<UsersAll/>}></Route>
                        <Route path="categories" element={<CategoriesList/>}></Route>
                        <Route path="books" element={<BooksList/>}></Route>
                        <Route path="loans" element={<LoansList/>}></Route>
                        <Route path="statistics" element={<StatisticsList/>}></Route>
                    </Route>
                    <Route path="/client" element={<ClientLayout/>}>
                        <Route index element={<ClientDashboard/>} />
                        <Route path="books" element={<ClientBooksList/>}></Route>
                        <Route path="loans" element={<ClientLoansList/>}></Route>
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
            <App/>
    )
}
