import React, {useState} from "react";
import supabase from "./supabase";
import {Link} from "react-router-dom";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import NotLoggedIn from "./NotLoggedIn";

function EmployeeInsert() {
    const [name, setName] = useState('');
    const [dept, setDepartment] = useState('');
    const [imageURL, setImageURL] = useState("");


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !dept) {
            alert('Please fill in all fields');
            return;
        }

        if (dept !== "CSE" && dept !== "ECE" && dept !== "Mech") {
            alert("Department must be CSE, ECE or Mech");
            return;
        }

        setTimeout(() => {
        }, 3000);

        const {data: insertedData, error: insertError} = await supabase
            .from('employees')
            .insert([{name, dept, photo_url: imageURL}]);

        if (insertError) {
            console.error('Error inserting data:', insertError);
            return;
        }

        alert('Data inserted successfully');
        setName('');
        setDepartment('');
    };

    return (
        <div className={"bg-gray-950 min-h-screen min-w-screen p-5"}>
            <AdminHeader activated={"insert"}/>
            <NotLoggedIn/>
            {localStorage.getItem("loginActivate") !== null && localStorage.getItem("loginActivate") === "true" &&
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-medium mb-2">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="text-white w-1/5 border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-medium mb-2">Department:</label>
                        <input
                            type="text"
                            value={dept}
                            onChange={handleDepartmentChange}
                            className="text-white w-1/5 border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-medium mb-2">Photo URL:</label>
                        {/*/>*/}
                        <input type="file"
                               className="text-white w-1/5 border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"
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
                </form>}
        </div>

    );
}

export default EmployeeInsert;