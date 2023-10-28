import {Link} from "react-router-dom";
import React from "react";

function NotLoggedIn() {
    return (
    <>
        {sessionStorage.getItem("loginActivate")===null && <div>
            <h1 className={"text-white text-2xl font-bold"}>Please login first</h1>
            <button
                className="bg-gray-700 hover:bg-gray-800 text-white rounded-md shadow-md transition duration-200 px-4 py-2"
            >
                <Link to={"/admin"} className="text-white">Admin Panel</Link>
            </button>
        </div>}

    </>
    )
}

export default NotLoggedIn