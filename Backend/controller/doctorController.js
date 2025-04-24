import Doctor from '../models/doctorModel.js'
import 'dotenv/config'


const appointmentcontroller = {  ///object Bna rae

    //alldoctors------------------------------------
         async getAllDoctor(req,res) {
                try{
                    let alldoctor = await Doctor.find()
                    res.json(alldoctor)
                }
                catch(err){
                    res.status(500).json({message:err.message})
        
                }
            },
    
    //id------------------------------------
         async getDoctorId(req,res) {
                try{
                    let onedoctor = await Doctor.findById(req.params.cid)
                    res.json(onedoctor)
                }
                catch(err){
                    res.status(500).json({message:err.message})
        
                }
            },

    //Create Doctors--------------------------
    async createDoctor(req, res) {
        const {name, specialization, location, image } = req.body;

        const newDoctor = new Doctor({
            name, 
            specialization, 
            location, 
            image
        })

        try {
            const savedDoctor = await newDoctor.save()
             res.json(savedDoctor);
        } catch (error) {
            res.status(500).json({message:error.message})
        }

}
}


export default appointmentcontroller;