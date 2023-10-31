import { useSelector } from "react-redux";
import { sellitem } from "../api";
import { RootState } from "../types";

const SellButton = () => {
  const item = useSelector((state:RootState)=>state.itemData.item)
  const highestBid = useSelector((state:RootState)=>state.itemData.highestBid)
  
  const handleSale = async()=>{
    try{
      await sellitem(item?._id,highestBid.user._id,highestBid.price)
    }
    catch(err){
      console.log(`${err}`)
    }
    window.location.reload()
  }
  return (
    <div>
      <button className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm w-15 flex justify-center items-center" onClick={handleSale}>
        Sell
      </button>
    </div>
  );
};

export default SellButton;
