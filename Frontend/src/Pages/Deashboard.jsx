import React,{useEffect, useState} from "react";
import { Users, UserPlus, Calendar, DollarSign, Activity, Clock, Award, Heart } from "lucide-react";
// import {Link} from "react-router-dom";

export default function Dashboard({totalPatients, totalDoctors}) {
  // let navigate = useNavigate()

  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalbed: 0,
    AppointmentFees:500
  });



  useEffect(() => {
    const dummyBills = 500; // ₹500 per patient (adjust as needed)
    setStats({
      totalDoctors:5,
      totalPatients,totalbed: 100 - totalPatients,
      AppointmentFees: `₹${dummyBills.toLocaleString()}`
    });
  }, [totalPatients, totalDoctors]);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10"></div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
              GOD GIVES LIFE,
              <span className="block text-blue-300">DOCTORS SAVE LIFE</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed animate-fade-in-delay">
              "I remind my fellows, residents and medical students that what we do
              is a privilege. People let us into the most intimate aspects of
              their lives, and they look to us to help guide them through very
              complex and delicate situations."
            </p>
          </div>
        </div>
        
        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 100C1200 100 1320 80 1380 70L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            color="from-blue-500 to-blue-600"
          />
          <StatsCard 
            title="Total Doctors"
            value={stats.totalDoctors}
            icon={UserPlus}
            color="from-green-500 to-green-600"
          />
          <StatsCard 
            title="Bed Availability"
            value={stats.totalbed}
            icon={Calendar}
            color="from-purple-500 to-purple-600"
          />
          <StatsCard 
            title="Appointment Fees"
            value={stats.AppointmentFees}
            icon={DollarSign}
            color="from-red-500 to-red-600"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Clock}
            title="24/7 Service"
            description="Round-the-clock medical assistance for all your healthcare needs"
          />
          <FeatureCard
            icon={Award}
            title="Expert Doctors"
            description="Highly qualified and experienced medical professionals"
          />
          <FeatureCard
            icon={Heart}
            title="Patient Care"
            description="Dedicated to providing the best possible patient experience"
          />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="container mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Activities</h2>
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            
              <div
                className="flex items-center p-4 bg-gray-50 rounded-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 mr-4"></div>
                <p className="text-gray-700"></p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatsCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-gradient-to-r ${color} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-blue-100 mb-2">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <Icon className="w-8 h-8 opacity-75" />
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);