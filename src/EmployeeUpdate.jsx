import React, {useEffect, useState} from "react";
import styles from "./EmployeeInsert.module.css";
import supabase from "./supabase";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import NotLoggedIn from "./NotLoggedIn";

function EmployeeUpdate(message) {
    const [id, setID] = useState();
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [employees, setEmployees] = useState([]);
    const [updateName, setUpdateName] = useState("");
    const [updateDept, setUpdateDept] = useState("");
    const [updateQualification, setUpdateQualification] = useState("");
    const [updateYear, setUpdateYear] = useState(0);
    const [updateSubjectTaken, setUpdateSubjectTaken] = useState("");
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

                setTimeout(() => {
                }, 3000);

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

    useEffect(() => {
        async function fetchTodos() {
            try {
                const {data, error} = await supabase
                    .from('employees')
                    .select('*')
                    .order('idd')

                if (error) {
                    console.error('Error fetching data:', error);
                } else {
                    setEmployees(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchTodos();
    }, []);

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

    async function qualChangeHandler() {
        const {data, error} = await supabase
            .from("employees")
            .update({qualifications: updateQualification})
            .eq('idd', id)
            .select()

        if (error) {
            alert("Error updating qualification")
            return
        }
        alert("Updated successfully")
        setID(null);
        setName("");
        setDept("");
    }

    async function updateYearChangeHandler() {
        const {data, error} = await supabase
            .from("employees")
            .update({yoe: updateYear})
            .eq('idd', id)
            .select()

        if (error) {
            alert("Error updating YOE")
            return
        }
        alert("Updated successfully")
        setID(null);
        setName("");
        setDept("");
    }

    async function updateSubjectsTakenChangeHandler() {
        const {data, error} = await supabase
            .from("employees")
            .update({subjectaken: updateSubjectTaken})
            .eq('idd', id)
            .select()

        if (error) {
            alert("Error updating subjects taken")
            return
        }
        alert("Updated successfully")
        setID(null);
        setName("");
        setDept("");
    }

    return (
        <div className={"bg-gray-950 min-h-screen min-w-screen p-5"}>
            <NotLoggedIn/>
            {sessionStorage.getItem("loginActivate") !== null && sessionStorage.getItem("loginActivate") === "true" && <div>
                <>
                    <AdminHeader activated={"update"}/>
                    <form onSubmit={handleSubmit}>
                        {!name && <div className={styles.form_group}>
                            <label>Update ID:</label>
                            <input className={"text-white w-1/5 bg-gray-900 border-none my-2"} type="number"
                                   onChange={(e) => setID(e.target.value)}/>
                        </div>}
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
                                <input
                                    className={"text-white w-1/5 border-none bg-gray-800 my-3 rounded-md placeholder-gray-400"}
                                    placeholder={`Qualifications`}
                                    onChange={(e) => setUpdateQualification(e.target.value)}></input>
                                <button className={"p-2 mx-3"} onClick={qualChangeHandler}>Update qualification</button>
                            </div>
                            <div>
                                <input
                                    className={"text-white w-1/5 border-none bg-gray-800 my-3 rounded-md placeholder-gray-400"}
                                    placeholder={`Years of Experience`}
                                    onChange={(e) => setUpdateYear(e.target.value)}></input>
                                <button className={"p-2 mx-3"} onClick={updateYearChangeHandler}>Update YOE</button>
                            </div>
                            <div>
                                <input
                                    className={"text-white w-1/5 border-none bg-gray-800 my-3 rounded-md placeholder-gray-400"}
                                    placeholder={`Subjects Taken`}
                                    onChange={(e) => setUpdateSubjectTaken(e.target.value)}></input>
                                <button className={"p-2 mx-3"} onClick={updateSubjectsTakenChangeHandler}>Update Subjects taken</button>
                            </div>
                            <div>
                                <input type="file"
                                       className="text-white w-1/5 border-none bg-gray-800 my-2 px-3 py-2 rounded-md placeholder-gray-600"
                                       accept={"image/*"} onChange={handleImageUploadUpdate}
                                       placeholder={"Update Image"}/>
                            </div>
                        </div>}
                        <div className="mb-4">
                            {!name && <button type="submit"
                                              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                                Submit
                            </button>}
                        </div>
                    </form>
                </>
                {<div className="flex flex-wrap">
                    {employees.map((employee) => (
                        <div className="card m-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-900 shadow-xl"
                             key={employee.idd}>
                            <figure className="px-10 pt-10">
                                <img className="w-1/2 rounded-full" src={employee.photo_url} alt="Employee"/>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title font-bold text-xl text-gray-50">{employee.name}</h2>
                                <p className={"text-gray-200 font-semibold text-lg"}>{employee.dept}</p>
                                <h3 className="card-title font-bold text-lg text-gray-50">ID {employee.idd}</h3>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>}
        </div>
    );
}

export default EmployeeUpdate;