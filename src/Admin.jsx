import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AdminHeader from "./AdminHeader";

function Admin() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    function loginHandler() {
        if (username === "admin" && password === "admin") {
            localStorage.setItem('loginActivate', 'true');
        }else{
            alert("Wrong credentials");
            return
        }
        navigate("/admin")
    }

    return <div className={"bg-gray-950 min-h-screen min-w-screen p-5 flex justify-center"}>
        <AdminHeader/>
        {localStorage.getItem('loginActivate') === null &&
            <div className={"flex flex-col w-1/3 items-center justify-center"}>
                <h1 className={"text-3xl font-bold text-gray-50"}>Login</h1>
                <div>
                    <input
                        className={"bg-gray-900  border-none p-3 w-full my-3"}
                        placeholder={"Username"}
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className={"bg-gray-900 border-none p-3 w-full my-3"}
                        placeholder={"Password"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={loginHandler}
                            className={"bg-yellow-700  hover:bg-yellow-800 my-3 font-semibold"}>Login
                    </button>
                </div>
                <button className={"bg-gray-900 hover-bg-gray-800 my-3 font-semibold"}>
                    <Link to={"/"}>View current employees</Link>
                </button>

            </div>}

    </div>
}

export default Admin