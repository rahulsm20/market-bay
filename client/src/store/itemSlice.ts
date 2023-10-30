import { createSlice } from "@reduxjs/toolkit";
import { BidType } from "../types";

interface ItemState {
  items: ItemType[];
  item: ItemType | undefined;
  bids:BidType[],
  highestBid:BidType
}

export type ItemType ={
  _id: string;
  name: string;
  price: number;
  seller: {
    username: string;
    email: string;
  };
  image: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

const initialState: ItemState = {
  items: [],
  item: undefined,
  bids:[],
  highestBid:{
    item_id:"",
    user:{
      username:"",
      email:""
    },
    price:0
  }
};

const filterSlice = createSlice({
  name: "itemData",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    getItemByID: (state, action) => {
      state.item = action.payload;
    },
    setBids:(state,action)=>{
      state.bids = action.payload
      state.highestBid = state.bids.reduce((max, item) => (item.price > max.price ? item : max), state.bids[0]);
    },
    updateBids:(state,action)=>{
      state.bids.push(action.payload)
    },
  },
});

export const { setItems, addItem, getItemByID,setBids ,updateBids} = filterSlice.actions;
export default filterSlice.reducer;
