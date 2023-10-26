import React, {useEffect, useState} from "react";
import styles from "./EmployeeInsert.module.css";
import {Button} from "antd";
import {Link} from "react-router-dom";
import supabase from "./supabase";
import axios from "axios";

function EmployeeUpdate() {
    const [id, setID] = useState();
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleImageUpload = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const response = await axios.post(
                'https://api.imgbb.com/1/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        key: '4169bbe5a7698938f02ec6792a8db4f3',
                    },
                }
            );

            if (response.status === 200) {
                const imageUrl = response.data.data.url;
                console.log('Image URL:', imageUrl);
                setImageURL(imageUrl)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    async function valueExistsInColumn(valueToCheck) {
        try {
            const {data, error} = await supabase
                .from("employees")
                .select("*")
                .eq("idd", valueToCheck)
                .limit(1);  // Just need to check existence, so limiting results to 1.

            if (error) throw error;

            return data.length > 0;  // Return true if value exists, else false.
        } catch (err) {
            console.error("Error checking value:", err);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            alert("ID is mandatory");
            return;
        }

        if (dept && (dept !== "CSE" && dept !== "ECE" && dept !== "Mech")) {
            alert("Department must be CSE, ECE or Mech");
            return;
        }

        if (await valueExistsInColumn(id) === false) {
            alert("A row with given ID does not exist in the table");
            return;
        }

        // const updatedFeatures = {};
        // if(name){
        //     updatedFeatures
        // }
        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (dept) {
            updates.dept = dept;
        }
        if (imageURL) {
            updates.photoURL = imageURL;
        }

        const {data, error} = await supabase
            .from("employees")
            .update(updates)
            .eq('idd', id)
            .select()

        if (error) {
            alert("Error update data");
            return;
        }

        alert("Successfully updated data");
        setID();
        setName('');
        setDept('');
    };

    return (
        <div className={styles.container}>
            <h1 className={"text-white text-2xl mb-6 font-semibold"}>Update Data</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                    <label>Update ID:</label>
                    <input className={"text-white bg-gray-900 border-none my-2"} type="number" value={id}
                           onChange={(e) => setID(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <label>Update Name:</label>
                    <input className={"text-white bg-gray-900 border-none my-2"} type="text" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <label>Update Branch:</label>
                    <input className={"text-white bg-gray-900 border-none my-2"} type="text" value={dept}
                           onChange={(e) => setDept(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <label>Update Photo URL:</label>
                    <input type="file"
                           className="text-white w-full border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"
                           accept={"image/*"}
                           onChange={handleImageUpload}/>
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
        </div>
    );
}

export default EmployeeUpdate;