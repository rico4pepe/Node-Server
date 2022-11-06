import mongoose from 'mongoose';

import AutoIncrementFactory from 'mongoose-sequence'


const AutoIncrement = AutoIncrementFactory(mongoose);
const noteSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    type:{type:String, required:true},
    text:{type:String, required:true},
    complete: {type:boolean, default:false},
 
},

{
    timestamps: true,
}


)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

export default mongoose.model("Note", noteSchema);