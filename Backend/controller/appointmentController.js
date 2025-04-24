import Appointment from '../models/appointmentModel.js'
import 'dotenv/config'

//all-----------------------------------
const appointmentcontroller = {
     async getAllAppointment(req,res) {
            try{
                let allappointment = await Appointment.find()
                res.json(allappointment)
            }
            catch(err){
                res.status(500).json({message:err.message})
    
            }
        },

//id------------------------------------
     async getAppointmentId(req,res) {
            try{
                let oneappointment = await Appointment.findById(req.params.cid)
                res.json(oneappointment)
            }
            catch(err){
                res.status(500).json({message:err.message})
    
            }
        },
//create---------------------------------
     async createAppointment(req,res) {
        const { fullName, email, phoneNo, prefferdDate, department, prefferdDoctor} = req.body;

        const newAppointment = new Appointment({
            fullName, 
            email,
            phoneNo,
            prefferdDate, 
            department, 
            prefferdDoctor
        })

        try {
            const savedAppointment = await newAppointment.save()
            res.json(savedAppointment)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },

// delete----------------------------------
async deleteAppointment(req, res) {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.cid);
        if (!deleted) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},

 
    
}
export default appointmentcontroller;

