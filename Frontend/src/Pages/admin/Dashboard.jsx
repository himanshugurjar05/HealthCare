import React, { useState } from 'react';
import { 
  Activity,
  Package, 
  Users, 
  DollarSign, 
  Bell
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [totalDoctors] = useState(4);
  const [totalPackages] = useState(3);
  const [totalPatients] = useState(1342);
  
  // Sample doctors and packages data
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialization: "Cardiology" },
    { id: 2, name: "Dr. Michael Chen", specialization: "Neurology" }
  ];
  
  const packages = [
    { id: 1, name: "Basic Health Checkup", price: "$99" },
    { id: 2, name: "Advanced Cardiac Package", price: "$299" }
  ];
  
  // Stats data
  const stats = [
    { title: "Doctors", value: totalDoctors, icon: <Activity size={20} /> },
    { title: "Packages", value: totalPackages, icon: <Package size={20} /> },
    { title: "Patients", value: totalPatients, icon: <Users size={20} /> },
    { title: "Revenue", value: "$48,352", icon: <DollarSign size={20} /> }
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">

        
        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-800 mr-3">
                        {stat.icon}
                      </div>
                      <h3 className="text-gray-500">{stat.title}</h3>
                    </div>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <ul className="space-y-3">
                  <li className="border-b pb-2">
                    <p className="text-sm">Dr. Sarah Johnson added a new appointment</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </li>
                  <li className="border-b pb-2">
                    <p className="text-sm">New patient registration: John Doe</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </li>
                  <li>
                    <p className="text-sm">Basic Health Package updated</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </li>
                </ul>
              </div>
            </>
          )}
          
          {activeTab === 'doctors' && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Manage Doctors</h3>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  Add Doctor
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Specialization</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{doctor.id}</td>
                        <td className="px-4 py-2">{doctor.name}</td>
                        <td className="px-4 py-2">{doctor.specialization}</td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 mr-2">Edit</button>
                          <button className="text-red-600">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'packages' && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Health Packages</h3>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  Add Package
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{pkg.id}</td>
                        <td className="px-4 py-2">{pkg.name}</td>
                        <td className="px-4 py-2">{pkg.price}</td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 mr-2">Edit</button>
                          <button className="text-red-600">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}