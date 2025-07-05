
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
app.get('/', (req, res) => {
  res.json('Welcome to APIs.........');
});


app.use('/api/user', UserRouter)
app.use('/api/doctor', DoctorRouter)
app.use('/api/appointment', AppointmentRouter)
app.use('/api/package', DiseasePackageRouter)



//listening--------------------
app.listen(process.env.PORT, ()=>{
  console.log("Server is run on 5500")
})