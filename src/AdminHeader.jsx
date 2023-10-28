import {Link, useNavigate} from "react-router-dom";
import React from "react";

function AdminHeader({activated}) {
    const navigate = useNavigate()
    function logoutHandler() {
        sessionStorage.removeItem('loginActivate');
        navigate('/')
    }

    return <>
        {sessionStorage.getItem('loginActivate') === 'true' && <div className="w-full flex justify-between">
            <div>
                <button className={`mx-2 ${activated==="insert" ? "bg-green-900 hover:bg-green-700" : "bg-blue-900 hover:bg-blue-700"}`}>
                    <Link to="/add">Insert</Link>
                </button>

                <button className={`mx-2 ${activated==="update" ? "bg-green-900 hover:bg-green-700" : "bg-blue-900 hover:bg-blue-700"}`}>
                    <Link to="/update">Update</Link>
                </button>

                <button className={`mx-2 ${activated==="delete" ? "bg-green-900 hover:bg-green-700" : "bg-blue-900 hover:bg-blue-700"}`}>
                    <Link to="/delete">Delete</Link>
                </button>
            </div>
            <div>
                <button onClick={logoutHandler} className="bg-gray-900 mx-1 hover:bg-gray-800 my-3 font-semibold">
                    Logout
                </button>
            </div>
        </div>}
    </>
}

export default AdminHeader