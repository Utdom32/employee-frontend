import React from 'react'
import './Styles.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddDepartment = () => {
    const navigate = useNavigate()
    const [departments, setDepartments] = React.useState({
        dep_name: '',
        description: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartments({
            ...departments,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/api/department/add', departments,{
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
  return (
    <div className=''>

    <div >
        <div className='mt-20'>
            <form onSubmit={handleSubmit} className='space-y-4 mt-4 addForm  addfarmImage'>
        <h3 className='text-2xl font-bold text-center'>Create New Department</h3>
            <div>
                <label htmlFor='dep_name' className='block text-gray-700'>Department Name</label>
                <input type="text"
                 name='dep_name' 
                 onChange={handleChange}
                 placeholder="Enter Department Name" 
                 className="border border-gray-200 bg-gray-300 rounded py-2 px-3 w-full" />
            </div>
            <div>
                <label htmlFor='description' className='block text-gray-700'>Description</label>
                <textarea 
                name='description'
                onChange={handleChange}
                rows="4"
                placeholder="Enter Description" 
                className="border border-gray-200 bg-gray-300 rounded py-2 px-3 w-full"></textarea>
            </div>
            <button 
            type="submit" 
            
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
                Create Department
            </button>
            </form>
            </div>
    </div>
                </div>
  )
}

export default AddDepartment
