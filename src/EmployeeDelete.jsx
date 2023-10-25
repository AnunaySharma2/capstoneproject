import React, {useState} from "react";
import styles from "./EmployeeInsert.module.css";
import {Button} from "antd";
import {Link} from "react-router-dom";
import supabase from "./supabase";

function EmployeeDelete() {
    const [id, setID] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
        } else {
            alert("Invalid credentials");
        }
    }

    if (!isLoggedIn) {
        return (
            <div className={styles.container}>
                <h1 className={"text-3xl font-bold text-gray-50"}>Login</h1>
                <div className={styles.form_group}>
                    <input className={"bg-gray-900 border-none p-3 w-full my-2"} placeholder={"Username"} type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <input className={"bg-gray-900 border-none p-3 w-full my-2"} placeholder={"Password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <button className={"bg-yellow-700 hover:bg-yellow-800 font-semibold"} onClick={handleLogin}>Login</button>
                </div>
                <button className={"bg-gray-900 hover:bg-gray-800 font-semibold"}>
                    <Link to={"/"}>View current employees</Link>
                </button>
            </div>
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            alert("Enter necessary details");
            return;
        }

        const {data, error} = await supabase
            .from("employees")
            .delete()
            .eq('idd', id)

        if (error) {
            alert("Error update data");
            return;
        }

        alert("Successfully deleted data");
        setID();
    };

    return (
        <div className={styles.container}>
            <h1 className={"text-white text-2xl mb-6 font-semibold"}>Delete Data</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                    <label>Delete ID:</label>
                    <input className={"text-white bg-gray-900 border-none my-2"} type="number" value={id} onChange={(e) => setID(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                        Submit
                    </button>
                </div>
                <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                    <Link to={"/"} className="text-white">View current employees</Link>
                </button>
            </form>
        </div>
    );
}

export default EmployeeDelete;