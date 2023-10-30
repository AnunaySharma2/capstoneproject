// src/EmployeePage.js
import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import {Link, useParams} from 'react-router-dom';

function EmployeePage() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const { data, error } = await supabase
                    .from('employees')
                    .select('*')
                    .eq('idd', id);

                if (error) {
                    console.error('Error fetching data:', error);
                } else {
                    console.log(data[0])
                    setEmployee(data[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"bg-gray-950 min-h-screen p-5"}>
            <div className="card h-3/4 mx-5 my-5 w-2/5 bg-gray-900 shadow-xl" key={employee.idd}>
                <figure><img className={"w-1/2 rounded-full mt-5"} src={employee.photo_url} alt="Profile"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold text-2xl text-gray-50">{employee.name}</h2>
                    <p className={"text-gray-200 font-semibold text-xl"}>Department: {employee.dept}</p>
                    <h3 className="card-title font-bold text-xl text-gray-50">ID: {employee.idd}</h3>
                    <h2 className="card-title font-bold text-lg text-gray-50">Qualification: {employee.qualifications}</h2>
                    <h2 className="card-title font-bold text-lg text-gray-50">Years of Experience: {employee.yoe} years</h2>
                    <h2 className="card-title font-bold text-lg text-gray-50">Subject Taken: {employee.subjectaken}</h2>
                </div>
            </div>
            <button className="bg-gray-700 mx-5 my-3 hover:bg-gray-800 text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                <Link to={"/"} className="text-white">View current employees</Link>
            </button>
        </div>
    );
}

export default EmployeePage;