import React, { useState } from 'react';
import axios from 'axios';

export default function CreateDoctor() {
  const [adminformData, setadminformData] = useState({
    image:"",
    name:"",
    price:"",
    description:""
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
        'http://localhost:5500/api/package/create',
        adminformData,
        {
          headers: {
            Authorization: token
          }
        }
      );
      setSuccess("Doctor created successfully!");
      setadminformData({ image:"", name:"", price:"", description:"" });
      setError('');
      console.log(res.data);
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
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"> Name</label>
          <input
            id="name"
            name="name"
            value={adminformData.name}
            type="text"
            placeholder="Enter Packages"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            id="price"
            name="price"
            value={adminformData.price}
            type="text"
            placeholder="Enter price"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            id="description"
            name="description"
            value={adminformData.description}
            type="text"
            placeholder="Enter Description"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Create HealthPackages
        </button>
      </form>
    </div>
  );
}
