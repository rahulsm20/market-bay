import { Request, Response } from "express";
import itemModel from "../models/item.model";
import s3 from "../utils/aws";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/user.model";

export default {
  createItem: async (req: any, res: Response) => {
    const { name, price, image } = req.body;
    const { originalname, buffer, mimetype } = req.file;
    try {
      const item_id = uuidv4();
      var key = `images/${item_id}-${originalname}`;
      const params = {
        Bucket: "settyl-images",
        Key: key,
        Body: buffer,
        ContentType: mimetype,
      };
      const encodedName = encodeURIComponent(originalname);
      key = `images/${item_id}-${encodedName}`;
      s3.putObject(params, async (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Error uploading image to S3" });
        } else {
          console.log("Image uploaded to S3:", key);
        }
      });

      const newItem = new itemModel({
        name: name,
        price: price,
        seller: req.user?.id,
        image: {
          url: `https://settyl-images.s3.ap-south-1.amazonaws.com/${key}`,
        },
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      console.log(`${err}`);
      res.status(400).json("Failed to add item");
    }
  },
  getItems: async (req: Request, res: Response) => {
    try {
      const items = await itemModel
        .find()
        .populate({ path: "seller", select: "email _id username" })
        .exec();
      res.status(200).json(items);
    } catch (err) {
      res.status(400).json("Failed to get items");
    }
  },
  getItemById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const item = await itemModel
        .findById(id)
        .populate({ path: "seller", select: "username id" })
        .populate({ path: "bids.user", select: "username email" });
      res.status(200).json(item);
    } catch (err) {
      res.status(400).json("Failed to get item");
    }
  },
  deleteItem: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await itemModel.findByIdAndDelete(id);
      console.log(result);
      res.status(204).json("Successfully deleted item");
    } catch (err) {
      res.status(400).json("Failed to delete item");
    }
  },
  addBid: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user, item, price } = req.body;
    if (!user || !item || !price) {
      res.status(400).json("Enter relevant details");
      return;
    }
    try {
      const bid = await itemModel.findByIdAndUpdate(
        { _id: id },
        { $push: { bids: { user: user, item: item, price: price } } }
      );
      console.log(bid);
      res.status(201).json(bid);
    } catch (err) {
      res.status(400).json("Failed to add bid");
    }
  },
  updateBid: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user, item, price } = req.body;
    if (!user || !item || !price) {
      res.status(400).json("Enter relevant details");
      return;
    }
    try {
      const bid = await itemModel.findByIdAndUpdate(
        id,
        {
          $set: {
            "bids.$[elem].price": price,
          },
        },
        {
          arrayFilters: [{ "elem.user": user }],
          new: true,
        }
      );
      console.log(bid);
      res.status(201).json(bid);
    } catch (err) {
      res.status(400).json("Failed to update bid");
    }
  },
  sellItem: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { user, price } = req.body;
      const updatedItem = await itemModel.findByIdAndUpdate(id, {
        $set: {
          sold: true,
        },
      });
      const updatedUser = await userModel.findByIdAndUpdate(user, {
        $push: {
          itemsBought: { item: id, price: price },
        },
      });
      res.status(200).json({ item: updatedItem, user: updatedUser });
    } catch (err) {
      res.status(400).json(`${err}`);
    }
  },
};
