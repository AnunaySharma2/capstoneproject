import {useEffect, useState} from "react";
import supabase from "./supabase";
import {Button, Input} from "antd";

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
        <div>
            <div>
                <Button type={"primary"} style={{margin: '16px'}} onClick={() => setBranch("CSE")}>CSE</Button>
                <Button type={"primary"} style={{margin: '16px'}} onClick={() => setBranch("Mech")}>Mech</Button>
                <Button type={"primary"} style={{margin: '16px'}} onClick={() => setBranch("ECE")}>ECE</Button>
            </div>
            <Input style={{margin: '12px', width: '200px'}} type="text" placeholder={"Search"}
                   onChange={(e) => setName(e.target.value)}/>
            <Button onClick={() => {
                if (name.length === 0) {
                    alert("Please enter a valid name");
                }
            }}>Search</Button>
            <div>
                {employees.map((name) =>
                    <div key={name.id} style={{margin: '12px'}}>
                        <span style={{marginRight: '16px'}}>{name.name}</span>
                        <span style={{marginRight: '16px'}}>{name.dept}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
