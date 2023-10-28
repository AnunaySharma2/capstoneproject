import React, {useState} from "react";
import styles from "./EmployeeInsert.module.css";
import {Link} from "react-router-dom";
import supabase from "./supabase";
import AdminHeader from "./AdminHeader";
import NotLoggedIn from "./NotLoggedIn";

function EmployeeDelete() {
    const [id, setID] = useState();

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
        <div className={"bg-gray-950 min-h-screen min-w-screen p-2"}>
            <NotLoggedIn/>
            {localStorage.getItem("loginActivate") !== null && localStorage.getItem("loginActivate") === "true" &&
                <div className={"bg-gray-950 min-h-screen min-w-screen p-5"}>
                    <AdminHeader activated={"delete"}/>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form_group}>
                            <label>Delete ID:</label>
                            <input className={"text-white w-1/5 bg-gray-900 border-none my-2"} type="number" value={id}
                                   onChange={(e) => setID(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <button type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                                Submit
                            </button>
                        </div>
                        <button
                            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                            <Link to={"/"} className="text-white">View current employees</Link>
                        </button>
                    </form>
                </div>}
        </div>
    );
}

export default EmployeeDelete;