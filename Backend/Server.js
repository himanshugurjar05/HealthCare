// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';


// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// let Doctors = [
//       {
//         id: 1,
        // name: 'Dr. Alex',
        // specialization: 'Cardiologist',
        // location: 'New York',
        // image: 'https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17817.jpg?t=st=1735125980~exp=1735129580~hmac=1621d66378e2fe64d8e31eb2c8fea6d3f03d8efd74f4a5214a4baf751f0bc1e9&w=826',

//       },
//       {
        // id: 2,
        // name: 'Dr. Smith',
        // specialization: 'Dermatologist',
        // location: 'California',
        // image: 'https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17817.jpg?t=st=1735125980~exp=1735129580~hmac=1621d66378e2fe64d8e31eb2c8fea6d3f03d8efd74f4a5214a4baf751f0bc1e9&w=826',
//       },
//       {
//         id: 3,
        // name: 'Dr. Jane',
        // specialization: 'Pediatrician',
        // location: 'Texas',
        // image: 'https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17817.jpg?t=st=1735125980~exp=1735129580~hmac=1621d66378e2fe64d8e31eb2c8fea6d3f03d8efd74f4a5214a4baf751f0bc1e9&w=826',
//       },
//     ]

// app.get("/api/docterlist",(req,res)=>{
//     res.send(Doctors);
// })

// app.listen(5500,()=>{  
//     console.log("Server is running on port 5000");
// })

import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import 'dotenv/config'

//import MongoDB and moddleware--------
import connectDB from './config/dbconfig.js';

//import routes---------------
import UserRouter from './routes/userRoutes.js'
import DoctorRouter from './routes/doctorRoutes.js'
import AppointmentRouter from './routes/appointmentRoutes.js'
import DiseasePackageRouter from './routes/diseasePackageRoutes.js'

//Mongo Conn-------------
connectDB()


const app = express();
app.use(cors())
app.use(bodyParser.json())

//Apis-------------------
// app.get("/api/docterlist", (req, res)=>{
//   res.json(Doctors)
// })

app.use('/api/user', UserRouter)
app.use('/api/doctor', DoctorRouter)
app.use('/api/appointment', AppointmentRouter)
app.use('/api/package', DiseasePackageRouter)

 

//listening--------------------
app.listen(process.env.PORT, ()=>{
  console.log("Server is run on 5500")
})