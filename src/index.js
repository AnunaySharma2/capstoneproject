import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import EmployeeInsert from "./EmployeeInsert";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeePage from "./EmployeePage";
import EmployeeDelete from "./EmployeeDelete";
import Admin from "./Admin";
import {createClient} from "@supabase/supabase-js";
import AboutPage from "./AboutPage";
import Courses from "./Courses";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/admin",
        element: <Admin/>
    },
    {
        path: "/add",
        element: <EmployeeInsert/>
    },
    {
        path: "/update",
        element: <EmployeeUpdate/>
    },
    {
        path: "/delete",
        element: <EmployeeDelete/>
    },
    {
        path: "/aboutus",
        element: <AboutPage/>
    },
    {
        path: "/employee/:id",
        element: <EmployeePage/>
    },
    {
        path: "/courses",
        element: <Courses/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
