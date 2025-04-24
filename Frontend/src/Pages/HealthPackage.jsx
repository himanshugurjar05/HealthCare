import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HealthPackage() {
  const [formdata, setFormData] = useState([]);

  useEffect(() => {
    async function getdata() {
      try {
        const Data = await axios.get('http://localhost:5500/api/package');
        setFormData(Data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getdata();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Health Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {formdata.map((e, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img src={e.image} alt={e.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h1 className="text-xl font-semibold text-gray-800">{e.name}</h1>
              <h2 className="text-lg text-blue-600 font-medium mt-2">₹{e.price}</h2>
              <p className="text-gray-600 mt-3 mb-4">{e.description}</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
