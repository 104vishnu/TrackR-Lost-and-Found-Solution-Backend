import mongoose,{Schema} from 'mongoose';

const itemSchema = new Schema({

    itemname:{
        type:String,
        trim:true,
        required:true
    },

    itemdesc:{
        type:String,
        trim:true,
        required:true
    },

    itemtype:{
        type:String,
        trim:true,
        required:true

    },

    img:{
        type: String,
    },
    userId:{
        type:String,
        require:true
    }

},{timestamps:true});

export default mongoose.model("Item",itemSchema);