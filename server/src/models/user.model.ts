import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  itemsBought: [
    {
      item: { type: mongoose.Schema.ObjectId, ref: "items" },
      price: { type: Number },
    },
  ],
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
