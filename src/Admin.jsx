import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./EmployeeInsert.module.css";

function Admin() {
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

    return <div className={"bg-gray-950 min-h-screen p-5"}>
        <h1 className={"text-3xl font-semibold text-white px-5"}>Admin Dashboard</h1>
        <div className={"flex mx-5 my-2 gap-5 "}>
            <button className={"bg-green-900 hover:bg-green-700"}>
                <Link to={"/add"}>Insert</Link>
            </button>

            <button className={"bg-green-900 hover:bg-green-700"}>
                <Link to={"/update"}>Update</Link>
            </button>
            <button className={"bg-green-900 hover:bg-green-700"}>
                <Link to={"/delete"}>Delete</Link>
            </button>
        </div>
    </div>
}

export default Admin