import {useState} from "react";
import supabase from "./supabase";
import styles from './EmployeeInsert.module.css';
import {Link} from "react-router-dom";
import {Button} from "antd";


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
                <h1>Login</h1>
                <div className={styles.form_group}>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <Button>
                    <Link to={"/"}>View current employees</Link>
                </Button>
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
        <div className={styles.container}>
            <h1>Insert Data</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleNameChange}/>
                </div>
                <div className={styles.form_group}>
                    <label>Department:</label>
                    <input type="text" value={dept} onChange={handleDepartmentChange}/>
                </div>
                <div className={styles.form_group}>
                    <label>Photo URL:</label>
                    <input type="text" value={photoUrl} onChange={handlePhotoUrlChange}/>
                </div>
                <div className={styles.form_group}>
                    <button type="submit">Submit</button>
                </div>
                <Button>
                    <Link to={"/"}>View current employees</Link>
                </Button>
            </form>
        </div>
    );
}

export default EmployeeInsert;