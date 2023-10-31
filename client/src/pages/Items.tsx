import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../api";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { setItems } from "../store/itemSlice";
import { RootState } from "../types";

const Items = () => {
  const items = useSelector((state: RootState) => state.itemData.items);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItems();
        dispatch(setItems(res));
      } catch (err) {
        console.log(`${err}`);
      }
    };
    fetchItems()
    .then(()=>setLoading(false))
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <p className="mt-5 text-2xl font-bold">Popular Items</p>
      <div className="p-10 flex items-center justify-center">
        {
          !loading ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
          {items.length > 0 ? (
            items.map((item, key) => {
              return <ItemCard item={item} key={key} />;
            })
            ) : (
              <>No items found</>
              )}
        </div>
        :
        <img src="https://i.stack.imgur.com/87Tpa.gif" />
            }
      </div>
    </div>
  );
};

export default Items;
