import {useEffect, useState} from "react";
import supabase from "./supabase";
import {Button, Input} from "antd";
import {Link} from "react-router-dom";
import EmployeeInsert from "./EmployeeInsert";

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
        <div style={{fontFamily: 'Arial, sans-serif', padding: '16px'}}>
            <div style={{marginBottom: '24px'}}>
                <Button
                    type={"primary"}
                    style={{
                        margin: '16px',
                        backgroundColor: '#3498db',
                        borderColor: '#3498db'
                    }}
                    onClick={() => setBranch("CSE")}
                >
                    CSE
                </Button>
                <Button
                    type={"primary"}
                    style={{
                        margin: '16px',
                        backgroundColor: '#e74c3c',
                        borderColor: '#e74c3c'
                    }}
                    onClick={() => setBranch("Mech")}
                >
                    Mech
                </Button>
                <Button
                    type={"primary"}
                    style={{
                        margin: '16px',
                        backgroundColor: '#2ecc71',
                        borderColor: '#2ecc71'
                    }}
                    onClick={() => setBranch("ECE")}
                >
                    ECE
                </Button>
            </div>
            <Input
                style={{margin: '12px', width: '200px'}}
                type="text"
                placeholder={"Search"}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={() => {
                if (name.length === 0) {
                    alert("Please enter a valid name");
                }
            }}>
                Search
            </Button>
            <Button>

            <Link to={"/add"}>Insert a new employee</Link>
            </Button>
            <div>
                {employees.map((employee) =>
                    <div key={employee.id} style={{
                        margin: '12px',
                        border: '1px solid #ddd',
                        padding: '8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img style={{width: '100px', height: '100px', borderRadius: '50%', marginRight: '16px'}}
                             src={employee.photo_url} alt={employee.name}/>
                        <div>
                            <span style={{
                                fontWeight: 'bold',
                                display: 'block',
                                marginBottom: '4px'
                            }}>{employee.name}</span>
                            <span style={{color: '#7f8c8d'}}>{employee.dept}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
