import { createSlice } from "@reduxjs/toolkit";
import { BidType } from "../types";

interface ItemState {
  items: ItemType[];
  item: ItemType | undefined;
  highestBid: BidType | undefined;
}

export type ItemType = {
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
  bids: BidType[];
  createdAt: string;
  updatedAt: string;
  sold:boolean;
};

const initialState: ItemState = {
  items: [],
  item: {
    _id: "",
    name: "",
    sold:false,
    price: 0,
    bids: [
      {
        item_id: "",
        price: null,
        user: {
          username: "",
          email: "",
        },
      },
    ],
    seller: {
      username: "",
      email: "",
    },
    image: {
      url: "",
    },
    createdAt: "",
    updatedAt: "",
  },
  highestBid: {
    item_id: "",
    user: {
      username: "",
      email: "",
    },
    price: 0,
  },
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
    getHighestBid: (state) => {
      state.highestBid = state.highestBid = state.item?.bids.reduce(
        (max, item) => {
          if (item && max && item.price && max.price) {
            return item.price > max.price ? item : max;
          }
          return max;
        },
        state.item.bids[0]
      );
    },
    updateBids: (state, action) => {
      state?.item?.bids.push(action.payload);
    },
  },
});

export const { setItems, addItem, getItemByID, getHighestBid, updateBids } =
  filterSlice.actions;
export default filterSlice.reducer;
