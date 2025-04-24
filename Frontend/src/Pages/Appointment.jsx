import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function AppointmentForm() {
  const navigate = useNavigate()
  // let [patientcount, setPatientCount] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNo: '',
    prefferdDate: '',
    department: '',
    prefferdDoctor: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev,[name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5500/api/appointment/create', {
        ...formData,
        phoneNo: Number(formData.phoneNo), // Ensure number
        prefferdDate: Number(formData.prefferdDate.replaceAll('-', '')), // Convert date to number
      });


      setMessage('Appointment created successfully!');
      console.log(response.data);
      // const newCount = patientcount + 1;
      // setPatientCount(newCount);

      navigate('/Patient')
      // navigate(`/h/${newCount}`)

      setFormData({
        fullName: '',
        email: '',
        phoneNo: '',
        prefferdDate: '',
        department: '',
        prefferdDoctor: '',
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  // function handelappointment() {
  //   setPatientCount((patientcount) => {
  //     const newCount = patientcount + 1;
  //     navigate(`/h/${newCount}`);
  //     return newCount;
  //   });
  // }
  

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Hospital Appointment Form
        </h2>

        {message && (
          <div className="mb-4 text-center text-red-600 font-semibold">{message}</div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="prefferdDate" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date:
            </label>
            <input
              type="date"
              id="prefferdDate"
              name="prefferdDate"
              value={formData.prefferdDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department:
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
              <option value="GeneralMedicine">General Medicine</option>
            </select>
          </div>

          <div>
            <label htmlFor="prefferdDoctor" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Doctor:
            </label>
            <select
              id="prefferdDoctor"
              name="prefferdDoctor"
              value={formData.prefferdDoctor}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. lex">Dr. lex</option>
              <option value="Dr. Jane">Dr. Jane</option>
              <option value="Dr.Sumit">Dr. Sumit</option>
            </select>
          </div>

          <button
            // onClick={()=>{handelappointment}}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}



