import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../api";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { setItems } from "../store/itemSlice";
import { RootState } from "../types";

const Items = () => {
  const items = useSelector((state: RootState) => state.itemData.items);
  const dispatch = useDispatch();
  const fetchItems = async () => {
    try {
      const res = await getItems();
      dispatch(setItems(res));
    } catch (err) {
      console.log(`${err}`);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <Navbar />
      <p className="mt-5 text-2xl font-bold">Popular Items</p>
      <div className="p-10 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
          {items.length > 0 ? (
            items.map((item, key) => {
              return <ItemCard item={item} key={key} />;
            })
          ) : (
            <>No items found</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
