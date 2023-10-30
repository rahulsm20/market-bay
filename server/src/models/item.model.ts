import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    image: {
      url: { type: String, required: true },
    },
    sold:{type:Boolean,required:true,default:false},
    bids:[{
      user: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
      price:{type:Number,required:true},
      item:{type:mongoose.Schema.Types.ObjectId,ref:'items'}
    }],
  },
  { timestamps: true }
);

const itemModel = mongoose.model("items", itemSchema);

export default itemModel;
