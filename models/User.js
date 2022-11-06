import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:false},
    googleId:{type:String, required:false},
    roles: [{type:String, default:"Employee"}],
    active: {type:Boolean, default:true},
    Id:{type:String},
})


export default mongoose.model("User", userSchema);