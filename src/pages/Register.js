import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { name, email, password });
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
