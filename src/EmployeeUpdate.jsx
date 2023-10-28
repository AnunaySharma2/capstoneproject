import React, {useEffect, useState} from "react";
import styles from "./EmployeeInsert.module.css";
import {Button} from "antd";
import {Link} from "react-router-dom";
import supabase from "./supabase";
import axios from "axios";

function EmployeeUpdate(message) {
    const [id, setID] = useState();
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateDept, setUpdateDept] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [updateImageURL, setUpdateImageURL] = useState("");

    const handleImageUploadUpdate = async (e) => {
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
                setUpdateImageURL(imageUrl)

                setTimeout(() => {}, 1000);

                const {data, error} = await supabase
                    .from("employees")
                    .update({photo_url: updateImageURL})
                    .eq('idd', id)
                    .select()

                if (error) {
                    alert("Error updating name")
                    return;
                }
                alert("Updated successfully")
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            alert("ID is mandatory");
            return;
        }

        try {
            const {data, error} = await supabase
                .from("employees")
                .select("*")
                .eq("idd", id)
                .limit(1);

            if (error) throw error;
            if (data.length === 0) {
                alert("Employee with this ID does not exist in the table")
            } else {
                setName(data[0]["name"]);
                setDept(data[0]["dept"]);
                setImageURL(data[0]["photo_url"])
            }
        } catch (err) {
            alert("Error checking value:", err);
        }
    };

    async function nameChangeHandler() {
        if (updateName === "") {
            alert("Name cannot be empty");
            return;
        }
        const {data, error} = await supabase
            .from("employees")
            .update({name: updateName})
            .eq('idd', id)
            .select()

        if (error) {
            alert("Error updating name")
            return
        }
        alert("Updated successfully")
        setID(null);
        setName("");
        setDept("");
    }

    async function deptChangeHandler() {
        if (updateDept !== "CSE" && updateDept !== "ECE" && updateDept !== "Mech") {
            alert("Department must be CSE, ECE or Mech");
            return;
        }

        const {data, error} = await supabase
            .from("employees")
            .update({dept: updateDept})
            .eq('idd', id)
            .select()

        if (error) {
            alert("Error updating name")
            return
        }
        alert("Updated successfully")
        setID(null);
        setName("");
        setDept("");
    }

    return (
        <div className={"bg-gray-950 min-h-screen min-w-screen p-5"}>
            <h1 className={"text-white text-3xl mb-6 font-semibold"}>Update Data</h1>
            <form onSubmit={handleSubmit}>
                {!name && <div className={styles.form_group}>
                    <label>Update ID:</label>
                    <input className={"text-white w-1/5 bg-gray-900 border-none my-2"} type="number"
                           onChange={(e) => setID(e.target.value)}/>
                </div>}

                {/*<div className={styles.form_group}>*/}
                {/*    <label>Update Name:</label>*/}
                {/*    <input className={"text-white bg-gray-900 border-none my-2"} type="text" value={name}*/}
                {/*           onChange={(e) => setName(e.target.value)}/>*/}
                {/*</div>*/}
                {/*<div className={styles.form_group}>*/}
                {/*    <label>Update Branch:</label>*/}
                {/*    <input className={"text-white bg-gray-900 border-none my-2"} type="text" value={dept}*/}
                {/*           onChange={(e) => setDept(e.target.value)}/>*/}
                {/*</div>*/}
                {/*<div className={styles.form_group}>*/}
                {/*    <label>Update Photo URL:</label>*/}
                {/*    <input type="file"*/}
                {/*           className="text-white w-full border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"*/}
                {/*           accept={"image/*"}*/}
                {/*           onChange={handleImageUploadUpdate}/>*/}
                {/*</div>*/}
                {name && <div>
                    <div>
                        <img className="w-1/5 h-1/5 py-3 rounded-full" src={imageURL} alt="Employee"/>
                    </div>
                    <div>
                        <input
                            className={"text-white w-1/5 border-none bg-gray-800 my-3 rounded-md  placeholder-gray-400"}
                            placeholder={`${name} (Type here to update)`}
                            onChange={(e) => setUpdateName(e.target.value)}></input>
                        <button className={"p-2 mx-3"} onClick={nameChangeHandler}>Update Name</button>
                    </div>
                    <div>
                        <input
                            className={"text-white w-1/5 border-none bg-gray-800 my-3 rounded-md placeholder-gray-400"}
                            placeholder={`${dept} (Type here to update)`}
                            onChange={(e) => setUpdateDept(e.target.value)}></input>
                        <button className={"p-2 mx-3"} onClick={deptChangeHandler}>Update dept</button>
                    </div>
                    <div>
                        <input type="file"
                               className="text-white w-1/5 border-none bg-gray-800 my-2 px-3 py-2 rounded-md placeholder-gray-600"
                               accept={"image/*"} onChange={handleImageUploadUpdate} placeholder={"Update Image"}/>
                    </div>
                </div>}
                <div className="mb-4">
                    {!name && <button type="submit"
                                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                        Submit
                    </button>}
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