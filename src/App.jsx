import React, {useEffect, useState} from "react";
import supabase from "./supabase";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

function App() {
    const [name, setName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [branch, setBranch] = useState("CSE");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const {data, error} = await supabase
                    .from('employees')
                    .select('*')
                    .eq('dept', branch)
                    .ilike('name', `%${name}%`)
                    .order('idd')

                if (error) {
                    console.error('Error fetching data:', error);
                } else {
                    setEmployees(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchTodos();
    }, [branch, name]);

    return (
        <div className="bg-gray-950 min-h-screen min-w-screen p-2">
            <Navbar/>
            <input
                type="text"
                className="bg-gray-900 rounded-md w-full md:w-1/2 border-gray-950 mx-5 mt-5 mb-1"
                placeholder="Search"
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 text-gray-950 block w-full md:w-auto md:inline-block my-2"
                onClick={() => {
                    if (name.length === 0) {
                        alert("Please enter a valid name");
                    }
                }}>

                Search
            </button>
            <button
                className="m-7 bg-gray-700 hover:bg-gray-800 text-white rounded-md shadow-md transition duration-200 px-4 py-2"
            >
                <Link to={"/admin"} className="text-white">Admin Panel</Link>
            </button>
            <div className="flex flex-wrap px-5 py-2 gap-5">
                <button
                    className={`${branch === 'CSE' ? "bg-green-900 hover:bg-green-700" : "bg-blue-900 hover:bg-blue-700"}`}
                    onClick={() => setBranch("CSE")}
                >
                    CSE
                </button>
                <button
                    className={`${branch === 'Mech' ? "bg-green-900 hover:bg-green-700" : "bg-blue-900 hover:bg-blue-700"}`}
                    onClick={() => setBranch("Mech")}
                >
                    Mech
                </button>
                <button
                    className={`${branch === 'ECE' ? "bg-green-900 hover:bg-green-700" : "bg-blue-900 hover:bg-blue-700"}`}
                    onClick={() => setBranch("ECE")}
                >
                    ECE
                </button>
            </div>


            <div>
                {loading && <div className="m-5 p-5 text-lg badge badge-error gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="inline-block w-4 h-4 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Loading data...
                </div>}
                {(!loading && employees.length === 0) && <div className="m-5 p-5 text-lg badge badge-error gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="inline-block w-4 h-4 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    No data present
                </div>}
                <div className="flex flex-wrap">
                    {employees.map((employee) => (
                        <div className="card m-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-900 shadow-xl"
                             key={employee.idd}>
                            <figure className="px-10 pt-10">
                                <img className="w-full rounded-full" src={employee.photo_url} alt="Employee"/>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title font-bold text-2xl text-gray-50">{employee.name}</h2>
                                <p className={"text-gray-200 font-semibold text-xl"}>{employee.dept}</p>
                                <h3 className="card-title font-bold text-xl text-gray-50">ID {employee.idd}</h3>
                                <Link to={`/employee/${employee.idd}`}>View Details</Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;