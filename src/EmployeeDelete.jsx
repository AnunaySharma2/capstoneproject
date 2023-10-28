import React, {useState} from "react";
import styles from "./EmployeeInsert.module.css";
import {Button} from "antd";
import {Link} from "react-router-dom";
import supabase from "./supabase";

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
        <div  className={"bg-gray-950 min-h-screen min-w-screen p-5"}>
            <h1 className={"text-white text-2xl mb-6 font-semibold"}>Delete Data</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                    <label>Delete ID:</label>
                    <input className={"text-white w-1/5 bg-gray-900 border-none my-2"} type="number" value={id} onChange={(e) => setID(e.target.value)}/>
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