import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchItemById, getBids } from "../api";
import BidModal from "../components/BidModal";
import Navbar from "../components/Navbar";
import { ItemType, getItemByID, setBids } from "../store/itemSlice";
import { BidType, RootState } from "../types";
import { formatDate, formatPrice } from "../utils";
import BackButton from "../components/BackButton";
import DeleteButton from "../components/DeleteButton";

const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchBids = async (id: string) => {
    const res = await getBids(id);
    dispatch(setBids(res));
    return;
  };
  const fetchItem = async (id: string) => {
    try {
      const res = await fetchItemById(id);
      dispatch(getItemByID(res));
      console.log(res);
    } catch (err) {
      console.log(`${err}`);
    }
  };
  const item: ItemType | undefined = useSelector(
    (state: RootState) => state.itemData.item
  );
  const bids: BidType[] = useSelector(
    (state: RootState) => state.itemData.bids
  );
  const highestBid: BidType = useSelector(
    (state: RootState) => state.itemData.highestBid
  );
  const user = useSelector((state: RootState) => state.authData.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authData.authenticated
  );
  useEffect(() => {
    // const item_data = localStorage.getItem(`item_${id}`);
    // const bids_data = localStorage.getItem(`itembids_${id}`);
    // if (item_data!=="undefined" || bids_data!=="[]") {
    //   console.log("here")
    //   item = JSON.parse(item_data)
    //   bids = JSON.parse(bids_data)
    //   console.log(item)
    // } else {
    // dispatch(getItemByID(id));
    fetchItem(id || "");
    fetchBids(id || "");
    // }
    // localStorage.setItem(`item_${id}`, JSON.stringify(item));
    // localStorage.setItem(`itembids_${id}`, JSON.stringify(bids));
  }, [dispatch, id]);

  console.log(bids);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex justify-around item mt-5">
        <BackButton />
      </div>
      <div className="flex justify-center mt-5">
        {item ? (
          <div className="flex flex-col md:flex-row bg-gray-900 m-10 w-2/3 rounded-xl gap-5">
            <img src={item.image.url} className="w-80 rounded-l-xl" />
            <div className="p-5 flex flex-col gap-2">
              <div className="flex flex-col justify-start items-start gap-2">
                <p className="text-sm md:text-4xl">{item.name}</p>
                <div className="flex gap-5 items-center">
                  {highestBid ? (
                    <div>
                      <p className="font-medium text-primary text-xl line-through">
                        {formatPrice(item.price)}
                      </p>
                      <p>Current highest bid</p>
                      <p className="text-primary flex text-2xl">
                        {formatPrice(highestBid.price)}
                      </p>
                    </div>
                  ) : (
                    <p className="font-medium text-primary text-2xl">
                      {formatPrice(item.price)}
                    </p>
                  )}
                </div>
                <p className="flex gap-1 text-sm sm:text-xs md:text-base">
                  <span>Sold by</span>
                  <span className="text-blue-500">{item.seller.username}</span>
                </p>
              </div>
              <p className="flex text-xs lg:text-base">
                Listed on {formatDate(item.createdAt)}
              </p>
              {item.updatedAt != item.createdAt ? (
                <p>{formatDate(item.updatedAt)}</p>
              ) : (
                <></>
              )}
              {!isAuthenticated ? (
                <a
                  href="/login"
                  className="flex btn bg-slate-200 hover:bg-slate-50 justify-start items-center normal-case text-black hover:text-black mt-5"
                >
                  Login to bid on this item
                </a>
              ) : item.seller.username != user.username ? (
                <BidModal id={item._id} />
              ) : (
                <></>
              )}
              {bids.length > 0 ? (
                bids.map((bid) => {
                  return (
                    <div>
                      <p className="flex font-medium text-lg">All bids</p>
                      <div className="grid grid-cols-2">
                        <div>
                          <p className="flex gap-4">
                            {bid.user.username}
                            <span className="text-green-400">
                              {bid.price.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            {item.seller.username == user.username ? (
              <DeleteButton id={id} />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
