import React from 'react';
import './Styles.css'; // Assuming you have a CSS file for styling
import axios from 'axios'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const { login} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post(
            'https://employee-frontend-dti.vercel.app/api/auth/login', {email,password}
        );
     
            if(response.data) {
                login(response.data.user);
                localStorage.setItem('token', response.data.token);
                if(response.data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else if(response.data.user.role === 'employee') {
                    navigate('/employee-dashboard');
                }
            }
          
        } catch (error) {
            if(error.response && !error.response.data.success){
                setError(error.response.data.error);
            }else {
                setError('Server Error: Unable to login');
            }
        }
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 loginPage familyName">
            <div className="loginForm">
                <h2 className="text-2xl font-bold mb-6 text-center">Authentication System</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email:</label>
                        <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setEmail(e.target.value)} 
                        required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password:</label>
                        <input 
                        type="password" 
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
}