import React, {useState} from "react";
import {Link} from "react-router-dom";
import supabase from "./supabase";

function Admin() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    async function signIn(email, password) {
        const { user, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password
        })
        if(error){
            console.log(error)
        }else{
            console.log(user)
        }
    }

    return <div className={"bg-gray-950 min-h-screen min-w-screen p-5 flex justify-center"}>
        {/*<h1 className={"text-3xl font-semibold text-white px-5"}>Admin Dashboard</h1>*/}
        {/*<div className={"flex mx-5 my-2 gap-5 "}>*/}
        {/*    <button className={"bg-green-900 hover:bg-green-700"}>*/}
        {/*        <Link to={"/add"}>Insert</Link>*/}
        {/*    </button>*/}

        {/*    <button className={"bg-green-900 hover:bg-green-700"}>*/}
        {/*        <Link to={"/update"}>Update</Link>*/}
        {/*    </button>*/}
        {/*    <button className={"bg-green-900 hover:bg-green-700"}>*/}
        {/*        <Link to={"/delete"}>Delete</Link>*/}
        {/*    </button>*/}
        {/*</div>*/}
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
                    className={"bg-gray-900   border-none p-3 w-full my-3"}
                    placeholder={"Password"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={signIn} className={"bg-yellow-700  hover:bg-yellow-800 my-3 font-semibold"}>Login</button>
            </div>
            <button className={"bg-gray-900 hover-bg-gray-800 my-3 font-semibold"}>
                <Link to={"/"}>View current employees</Link>
            </button>
        </div>

    </div>
}

export default Admin