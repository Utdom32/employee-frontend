import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true,
        width: "110px",
    },
    {
        name: 'Department Name',
        selector: (row) => row.dep_name,
        sortable:true,
        width: "180px",
    },
    {
        name: 'Description',
        selector: (row) => row.description
    },
    {
        name: 'Action',
        cell: (row) => row.action,
        width: "200px",
        

    }
]

export const DepartmentButtons = ({_id,onDeleteDepartment}) => {
    const navigate = useNavigate()

    const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
        try {
            const response = await axios.delete(`http://localhost:8080/api/department/${_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                onDeleteDepartment();
                // navigate("/admin-dashboard/departments");
            } else {
                window.location.reload();
            }
        } catch (error) {
            if (error.response && !error.response.data.success)
                alert(error.response.data.error);
        }
    }
}
    return (
        <div className="flex space-x-3">
            <button 
            onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            className="px-3 py-1 bg-teal-500 rounded hover:bg-teal-700 text-white">Edit</button>
            <button 
            onClick={()=> handleDelete(_id)}
            className="px-3 py-1 bg-red-500 rounded hover:bg-red-700 text-white">Delete</button>
        </div>
    )
}