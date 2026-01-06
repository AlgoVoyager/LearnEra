import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
const AuthPage = () => {
    const navigate = useNavigate();
    const {fetchUser} = useContext(UserContext)
    const [role, setRole] = useState('user');
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const resetForm= ()=>{
        setEmail('');
        setPassword('')
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 8 characters long');
            return;
        }
        try {
            const response = await axios.post(
                role=='user'?'/v1/user/signin':'/v1/admin/signin'
                ,{
                email,password
            })
            console.log(response.data)
            toast.success(response.data.message)
            localStorage.setItem('token',response.data.token)
            await fetchUser()
            resetForm()
            navigate('/')

        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        }
        
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-black text-center mb-6">LearnEra</h1>
                <h2 className="text-2xl font-bold text-black text-center mb-6">
                    Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
                </h2>
                <div>
                    {/* The ToastContainer acts as a placeholder for all toasts */}
                    <ToastContainer />
                </div>

                <div className="flex mb-6 bg-gray-100 p-1 rounded-md">
                    <button
                        onClick={() => setRole('user')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'user' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                            }`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setRole('admin')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                            }`}
                    >
                        Admin
                    </button>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                    
                    <div className="flex gap-2 items-center justify-center">
                        <p className="text-sm text-gray-600">
                           {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </p>
                        <button
                            type="button"
                            className="w-fit py-0 px-1 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() =>{
                                setIsLogin(!isLogin)
                                setRole(role === 'user' ? 'admin' : 'user')
                                setEmail('')
                                setPassword('')
                            }}
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;