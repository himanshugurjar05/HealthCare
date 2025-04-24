import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  
name:{
   type:String,
   required:true
},

specialization:{
    type:String,
    required:true
},

location:{
    type:String,
    required:true
},

image:{
    type:String,
    required:true
}

})

export default mongoose.model('Doctor', DoctorSchema)