import mongoose from "mongoose";

export const connect = async (url: string) => {
  try {
    await mongoose.connect(url)
    .then(()=>console.log("Connected to DB"))
  } catch (err) {
    console.log(`Error: ${err}`);
    return;
  }
};
