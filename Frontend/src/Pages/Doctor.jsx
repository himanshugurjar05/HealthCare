import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Award, Clock, Search } from "lucide-react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Doctors({ setIndex }) {

  let [Doctors, setDoctors] = useState([])
  let [searchTerm, setSearchTerm] = useState("")

  let Navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("http://localhost:5500/api/doctor")
      setDoctors(response.data)
    }
    fetchData()
  }, [])

  function handleClick(doctor) {
    setIndex(doctor.name)
    Navigate('/Appointment')
  }

  const filteredDoctors = Doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-8 min-h-screen">

      <div className="flex  mt-[-30px]">
        {/* Header */}
        <div className="w-full flex justify-end pr-[17vw]">
          <div className="flex items-center gap-6">
            <div className="w-160">
              <h1 className="text-[30px] font-semibold text-gray-800 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-black pr-9 text-black font-bold">
                Popular Health Packages
              </h1>
            </div>
            <div className="w-auto">
              <button
                onClick={() => Navigate('/Package')}
                className="px-10 py-1 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl
                         transform transition-all duration-300 
                         hover:from-blue-600 hover:to-cyan-600 
                         hover:shadow-xl hover:scale-105
                         active:scale-95
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Health Packages
              </button>
            </div>
          </div>
        </div>


        {/* Search Bar */}
        <div className="mt-6 mb-6 max-w-xl mx-auto relative animate-[pulse-border_3s_infinite]">
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="w-[8vw] h-9 px-3 py-3 pl-12 border-2 border-transparent bg-gray-100 rounded-xl shadow-md text-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500
               transition-all duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 animate-pulse"
          />
        </div>

      </div>
      <div className="w-[680px] absolute left-80 flex items-center justify-center h-[1px] bg-gray-500  mt-[-15px]"></div>


      {/* Doctors Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50" />

            {/* Top bar */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />

            <div className="p-6">
              {/* Image */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="relative w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md transform transition-transform duration-300 group-hover:scale-105 object-cover"
                />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {doctor.name}
                </h2>

                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <Award className="w-5 h-5" />
                  <p className="text-lg font-medium">{doctor.specialization}</p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <p>{doctor.location}</p>
                </div>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Book Now</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => handleClick(doctor)}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg 
                          transform transition-all duration-300 
                          hover:from-blue-600 hover:to-cyan-600 
                          hover:shadow-lg hover:scale-[1.02]
                          active:scale-95
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
