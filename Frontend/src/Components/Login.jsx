// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// // import {jwtDecode} from 'jwt-decode'; //Google Oauth20

// // const API_URI = import.meta.env.VITE_API_URI;

// export default function Login({setLoggedIn}) {
//   let navigate = useNavigate();

//   let [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   let [error, setError] = useState('');

//   // Check for Google OAuth token in URL and login the user
// //   useEffect(() => {
// //     const token = new URLSearchParams(window.location.search).get("token");
  
// //     if (token) {
// //       try {
// //         console.log("Received Token:", token);
// //         const decodedUser = jwtDecode(token);
  
// //         localStorage.setItem("token", token);
// //         localStorage.setItem("user", JSON.stringify(decodedUser));
  
// //         window.history.replaceState({}, document.title, window.location.pathname);
// //         navigate("/");
// //       } catch (err) {
// //         console.error("Token Decoding Error:", err);
// //         setError("Invalid authentication token");
// //       }
// //     }
// //   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       let Res = await axios.post('http://localhost:5500/api/user/login', formData);
//       console.log(Res.data);

//       if (Res.data.token) {
//         localStorage.setItem('token', Res.data.token);
//         localStorage.setItem('user', JSON.stringify(Res.data.user));
//         setLoggedIn(true);         // ✅ THIS IS ESSENTIAL
//         navigate("/home");
//       } else {
//         setError(Res.data.message);
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError(err.response?.data?.message || "An error occurred");
//     }
//   }

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   function handleGoogleLogin() {
//     window.location.href = `${API_URI}/user/auth/google`; 
//      // ✅ Corrected API route
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
//         <div className="text-center">
//           <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Log In As a User</h2>
//           <p className="mt-2 text-sm text-gray-600">Access your account</p>
//         </div>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="sr-only">Email</label>
//               <input
//                 type="text"
//                 name="email"
//                 id="email"
//                 placeholder="Enter your email..."
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Enter your password..."
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
//             >
//               Log In
//             </button>
//           </div>
//         </form>

//         <button
//           onClick={handleGoogleLogin}
//           className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
//         >
//           Login with Google
//         </button>

//         <div className="flex items-center justify-between">
//           <div className="text-sm">
//             <Link to="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Login as an admin
//             </Link>
//           </div>
//           <div className="text-sm">
//             <Link to='/signup' className="font-medium text-indigo-600 hover:text-indigo-500">
//               Create account
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:''
  });

  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

  // Check if role is selected
    if (!formData.role) {
      setError("Please select a role before logging in.");
      return;
    }
    
    try {
      const Res = await axios.post('http://localhost:5500/api/user/login', formData);
      const { token, user } = Res.data;

     // Check if selected role matches actual user role
      if (user.role !== formData.role) {
        setError("Selected role doesn't match your account role.");
        return;
      }


      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('role', user.role); // role should be either 'admin' or 'user'
        
        // console.log("User object:", user);
        // console.log("User role:", user.role);


        setLoggedIn(true); // update app state

        // ✅ Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin/Dashboard');
        } else {
          navigate('/h');
        }
      } else {
        setError(Res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred");
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Log In</h2>
          <p className="mt-2 text-sm text-gray-600">Access your account</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password..."
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

        <div className="relative">
            <label htmlFor="role" className="sr-only">Role</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="appearance-none w-full px-3 py-3 pr-10 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          
            {/* Chevron Down Icon */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
        </div>


          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-md hover:from-blue-700 hover:to-indigo-800 transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Optional Google login */}
        {/* <button
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 border border-gray-300 rounded-md text-gray-900 bg-white hover:bg-gray-100 transition"
        >
          Login with Google
        </button> */}

        <div className="flex items-center justify-between text-sm">
          <Link to="/admin/login" className="text-indigo-600 hover:underline">
            Admin Login
          </Link>
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
