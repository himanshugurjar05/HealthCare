import React, { useState, useEffect } from "react";
import axios from "axios";
import {CloudDownload, Trash2, BedIcon} from 'lucide-react'
 
export default function PatientList({totalPatients, setTotalPatients}) {

  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/appointment");
        // console.log(res.data);
        setPatient(res.data);
        setTotalPatients(res.data.length);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/appointment/${id}`);
      const updatedList = patient.filter(p => p._id !== id);
      setPatient(updatedList);
      setTotalPatients(updatedList.length);

      localStorage.setItem("count", updatedPatients.length.toString());
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
 


  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Patient Appointments</h1>
        
        {patient.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-500"><img src="https://media.tenor.com/wfEN4Vd_GYsAAAAM/loading.gif" alt="" /></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {patient.map((e, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-1">
                        {e.fullName}
                      </h2>
                      <span className="text-sm text-gray-500">
                        ID: #{(index + 1001).toString().padStart(4, '0')}
                      </span>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Appointment
                    </span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <span className="text-xl text-gray-950">
                        BedID: #{(index + 1).toString().padStart(0, '0')}
                      </span>

                    <InfoRow icon="mail" label="Email" text={e.email} />
                    <InfoRow icon="phone" label="Phone" text={e.phoneNo} />
                    <InfoRow icon="calendar" label="Date" text={e.prefferdDate} />
                    <InfoRow icon="building" label="Department" text={e.department} />
                    <InfoRow icon="user" label="Doctor" text={e.prefferdDoctor} />
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <button className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                    <button   onClick={() => handleDelete(e._id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      <Trash2 size={20}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, text }) {
  const iconPaths = {
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  };
  
  return (
    <div className="flex items-center text-gray-700">
      <div className="bg-blue-50 p-2 rounded-md mr-4">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={iconPaths[icon]}
          />
        </svg>
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="text-sm font-medium">{text}</div>
      </div>
    </div>
  );
}