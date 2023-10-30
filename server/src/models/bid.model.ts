import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    item_id:{type:mongoose.Schema.Types.ObjectId, ref:'items', required:true},
    price:{type:Number, required:true},
})

const bidModel = mongoose.model('bids',bidSchema)

export default bidModel