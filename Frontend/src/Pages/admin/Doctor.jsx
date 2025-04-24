import React, { useState } from 'react';
import axios from 'axios';

export default function CreateDoctor({totalDoctors, setTotalDoctors}) {
  const [adminformData, setadminformData] = useState({
    name: '',
    specialization: '',
    location: '',
    image: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a doctor.");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5500/api/doctor/create',
        adminformData,
        {
          headers: {
            Authorization: token
          }
        }
      );
      setSuccess("Doctor created successfully!");
      setadminformData({ name: '', specialization: '', location: '', image: '' });
      setError('');
      console.log(res.data);
      setTotalDoctors(prev => prev + 1);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess('');
    }
  }

  function handleChange(e) {
    setadminformData({ ...adminformData, [e.target.name]: e.target.value });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Doctor</h2>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
          <input
            id="name"
            name="name"
            value={adminformData.name}
            type="text"
            placeholder="Enter Doctor name"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <input
            id="specialization"
            name="specialization"
            value={adminformData.specialization}
            type="text"
            placeholder="Enter specialization"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            id="location"
            name="location"
            value={adminformData.location}
            type="text"
            placeholder="Enter location"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            id="image"
            name="image"
            value={adminformData.image}
            type="text"
            placeholder="Enter image URL"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button  onClick={() => setTotalDoctors(totalDoctors + 1)}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Create Doctor
        </button>
      </form>
    </div>
  );
}
