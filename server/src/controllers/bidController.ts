import {Request,Response} from 'express'
import bidModel from '../models/bid.model'
export default {
    addBid:async (req:Request,res:Response) => {
        const {item_id,price}  = req.body;
        try{
            const bid = await bidModel.create({
                user: req.user?.id,
                item_id:item_id,
                price:price
            });
            res.status(201).json(bid)
        }
        catch(err){
            res.status(400).json(`${err}`)
        }
    },
    getBids: async(req:Request,res:Response)=>{
        const {id}  = req.params
        try{
            const bids = await bidModel.find({item_id:id}).populate({path:"user",select:"username email"})
            res.status(200).json(bids)
        }
        catch(err){
            res.status(400).json(`${err}`)
        }
    },
    getBidsByUserID:async(req:Request,res:Response)=>{
        const {user_id} = req.params
        try{
            const bids = await bidModel.find({user:user_id})
            res.status(200).json(bids)
        }
        catch(err){
            res.status(400).json(`${err}`)
        }
    },
    updateBid:async(req:Request,res:Response)=>{
        const {id}= req.params
        try{
            const bid = await bidModel.findByIdAndUpdate(id,...req.body)
            res.status(202).json(bid)
        }
        catch(err){
            res.status(400).json(`${err}`)
        }
    }
}