import {useEffect, useState} from "react";
import supabase from "./supabase";
import {Link} from "react-router-dom";

function App() {
    const [name, setName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [branch, setBranch] = useState("CSE");

    useEffect(() => {
        async function fetchTodos() {
            try {
                const {data, error} = await supabase
                    .from('employees')
                    .select('*')
                    .eq('dept', branch)
                    .ilike('name', `%${name}%`)

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
    }, [branch, name]);

    return (
        <div className={"bg-gray-950 min-h-screen"}>
            <input
                type="text"
                className={"bg-gray-900 rounded-md w-1/2 border-gray-950 mx-5 mt-5 mb-1"}
                placeholder={"Search"}
                onChange={(e) => setName(e.target.value)}
            />
            <button className={"bg-yellow-500 hover:bg-yellow-600 py-2 text-gray-950"} onClick={() => {
                if (name.length === 0) {
                    alert("Please enter a valid name");
                }
            }}>
                Search
            </button>
            <div className={"flex flex-1 p-5 gap-5"}>
                <button
                    className={"bg-blue-900 hover:bg-blue-700"}
                    onClick={() => setBranch("CSE")}
                >
                    CSE
                </button>
                <button
                    className={"bg-blue-900 hover:bg-blue-700"}
                    onClick={() => setBranch("Mech")}
                >
                    Mech
                </button>
                <button
                    className={"bg-blue-900 hover:bg-blue-700"}
                    onClick={() => setBranch("ECE")}
                >
                    ECE
                </button>
            </div>

            <div className={"flex mx-5 my-2 gap-5"}>
                <button className={"bg-green-900 hover:bg-green-700"}>
                    <Link to={"/add"}>Insert</Link>
                </button>

                <button className={"bg-green-900 hover:bg-green-700"}>
                    <Link to={"/update"}>Update</Link>
                </button>
                <button className={"bg-green-900 hover:bg-green-700"}>
                    <Link to={"/delete"}>Delete</Link>
                </button>
            </div>


            <div>
                {employees.length === 0 && <div className="m-5 p-5 text-lg badge badge-error gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="inline-block w-4 h-4 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    No data present
                </div>}
                <div className={"flex"}>
                    {employees.map((employee) => (
                        <div className="card mx-5 my-5 w-1/5 bg-gray-900 shadow-xl" key={employee.idd}>
                            <figure><img className={"w-1/2 rounded-full mt-5"} src={employee.photo_url} alt="Shoes"/></figure>
                            <div className="card-body items-center">
                                <h2 className="card-title font-bold text-2xl text-gray-50">{employee.name}</h2>
                                <p className={"text-gray-200 font-semibold text-xl"}>{employee.dept}</p>
                                <h3 className="card-title font-bold text-xl text-gray-50">ID {employee.idd}</h3>

                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default App;
