import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },

    phoneNo:{
        type:Number,
        required:true
    },

    prefferdDate:{
        type:Number,
        required:true
    },
    
    department:{
        type:String,
        required:true
    },

    prefferdDoctor:{
        type:String,
        required:true
    }
  
})

export default mongoose.model('Appointment', AppointmentSchema)