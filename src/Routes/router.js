import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddProduct from "../Pages/AddProduct/AddProduct";
import Category from "../Pages/Category/Category";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";
import Profile from "../Pages/Profile/Profile";
import Register from "../Pages/Register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
            {
                path: "/products",
                element: <Products></Products>
            },
            {
                path: '/category',
                element: <Category></Category>
            },
            {
                path: '/addproduct',
                element:<AddProduct></AddProduct>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            }
        ]
    }
])

export default router;