import {Link} from "react-router-dom";
import React from "react";

const Navbar = () => {
    return <nav className="sticky top-0 z-50 bg-opacity-75 backdrop-filter backdrop-blur-lg shadow-md">
        <div className="flex justify-between items-center p-4">
            <div className="text-yellow-600 text-5xl font-black">
                University of VA
            </div>
            <div className="space-x-4">
                <Link className={"text-2xl text-yellow-500 font-bold"} to={"/aboutus"}>About us</Link>
                <Link className={"text-2xl text-yellow-500 font-bold"} to={"/"}>Faculty Info</Link>
                <Link className={"text-2xl text-yellow-500 font-bold"} to={"/courses"}>Latest courses</Link>
            </div>
        </div>
    </nav>
}

export default Navbar