
import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema({


name:{
    type : String,
    trim: true,  // Trim leading and trailing whitespaces
    // unique: true, // Ensures uniqueness of the 'username' field
    require:true
},

email:
{
    type:String,
    trim:true,
    unique:true,
    lowercase:true,
    require:true
},

mobile:{
    type:String,
    trim:true,
    unique:true,
    require:true
},

address:{
    type:String,
    trim:true,
    require:true
},
password:{
    type:String,
    require:true

},
userId:
{
    type:String,
    require:true
}





},{timestamps:true});

export default mongoose.model("User",userSchema);