import { Link } from "react-router-dom";
import { Item } from "../types";

const ItemCard = ({ item }: Item) => {
  return (
    <Link className="rounded-md bg-gray-900 hover:text-white relative inline-block" to={`/item/${item._id}`}>
      <img src={item.image?.url} alt="" className="rounded-t-md w-80 md:h-3/4" />
      {
        item.sold ? 
        <img src='/sold.webp' className="absolute top-0"/>
        :
        <></>
      }
      <div className="flex gap-5 items-start justify-start p-2 m-2">
        <div className="flex flex-col items-start justify-start">
          <p className="text-xl font-medium ">{item.name}</p>
          Listing price 
          <p className="font-bold text-indigo-500 text-xl"> 
            {item.price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
