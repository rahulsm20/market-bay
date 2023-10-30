import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { User } from "../types";
require("dotenv").config();

const secret = process.env.JWT_SECRET||"";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: User|null = await userModel.findOne({ email: email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  try {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ email: user.email, id: user._id,username:user.username }, secret, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password,username } = req.body;
  if (!password) {
    res.status(400).json("No password");
    return;
  }
  try{
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
          email:email,
          password:hashedPassword,
          username:username
        })
        res.status(201).json(user)
    }
    catch(err){
        console.log(`${err}`)
        res.status(404).json(`Error signing up`)
    }
};

export const getUserDetails = async(req:Request,res:Response)=>{
  const {id} = req.params;
  try{
    const user = await userModel.findById(id).select("email username itemsBought _id").populate("itemsBought.item")
    res.status(200).json(user)
  }
  catch(err){
    res.status(400).json(`${err}`)
  }
}