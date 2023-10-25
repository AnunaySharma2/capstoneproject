import {useState} from "react";
import supabase from "./supabase";
import styles from './EmployeeInsert.module.css';
import {Link} from "react-router-dom";

function EmployeeInsert() {
    const [name, setName] = useState('');
    const [dept, setDepartment] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
        } else {
            alert("Invalid credentials");
        }
    }

    if (!isLoggedIn) {
        return (
            <div className={styles.container}>
                <h1 className={"text-3xl font-bold text-gray-50"}>Login</h1>
                <div className={styles.form_group}>
                    <input className={"bg-gray-900 border-none p-3 w-full my-2"} placeholder={"Username"} type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <input className={"bg-gray-900 border-none p-3 w-full my-2"} placeholder={"Password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <button className={"bg-yellow-700 hover:bg-yellow-800 font-semibold"} onClick={handleLogin}>Login</button>
                </div>
                <button className={"bg-gray-900 hover:bg-gray-800 font-semibold"}>
                    <Link to={"/"}>View current employees</Link>
                </button>
            </div>
        )
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handlePhotoUrlChange = (e) => {
        setPhotoUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !dept || !photoUrl) {
            alert('Please fill in all fields');
            return;
        }

        if(!(photoUrl.endsWith(".jpg") || photoUrl.endsWith(".png") || photoUrl.endsWith(".jpeg"))){
            alert("Photo must be of compatible type");
            return;
        }

        if (dept !== "CSE" && dept !== "ECE" && dept !== "Mech") {
            alert("Department must be CSE, ECE or Mech");
            return;
        }

        // Insert the data into the Supabase table
        const {data: insertedData, error: insertError} = await supabase
            .from('employees') // Replace with your table name
            .insert([{name, dept, photo_url: photoUrl}]);

        if (insertError) {
            console.error('Error inserting data:', insertError);
            return;
        }

        alert('Data inserted successfully');
        setName('');
        setDepartment('');
        setPhotoUrl('');
    };

    return (
        <div className="bg-gray-900 p-8 rounded-xl shadow-md max-w-xl mx-auto mt-10">
            <h1 className="text-white text-2xl mb-6 font-semibold">Insert Data</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="text-white w-full border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-2">Department:</label>
                    <input
                        type="text"
                        value={dept}
                        onChange={handleDepartmentChange}
                        className="text-white w-full border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-2">Photo URL:</label>
                    <input
                        type="text"
                        value={photoUrl}
                        onChange={handlePhotoUrlChange}
                        className="text-white w-full border-none bg-gray-800 my-2 px-3 py-2 rounded-md text-black placeholder-gray-600"
                    />
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

export default EmployeeInsert;