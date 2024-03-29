import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItemById } from "../api";
import BackButton from "../components/BackButton";
import BidModal from "../components/BidModal";
import DeleteButton from "../components/DeleteButton";
import Navbar from "../components/Navbar";
import { ItemType, getHighestBid, getItemByID } from "../store/itemSlice";
import { BidType, RootState } from "../types";
import { formatDate, formatPrice } from "../utils";
import UpdateBidModal from "../components/UpdateBidModal";
import SellButton from "../components/SellButton";

const ItemPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const item: ItemType | undefined = useSelector(
    (state: RootState) => state.itemData.item
  );
  const highestBid: BidType = useSelector(
    (state: RootState) => state.itemData.highestBid
  );
  const user = useSelector((state: RootState) => state.authData.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authData.authenticated
  );

  useEffect(() => {
    const fetchHighestBid = async () => {
      try {
        dispatch(getHighestBid());
      } catch (err) {
        console.log(`${err}`);
      }
    };
    const fetchItem = async (id: string) => {
      try {
        const res = await fetchItemById(id);
        dispatch(getItemByID(res));
      } catch (err) {
        console.log(`${err}`);
      }
    };
    fetchItem(id || "")
      .then(() => fetchHighestBid())
      .then(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <img src="https://i.stack.imgur.com/87Tpa.gif" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="flex justify-around item mt-5">
          <BackButton />
        </div>
        <div className="flex justify-center mt-5 ">
          {item ? (
            <div className="flex flex-col xl:flex-row bg-gray-900 m-10 w-2/3 md:w-1/2 rounded-xl gap-5">
              <img
                src={item.image.url}
                className="w-full md:w-full xl:w-1/2 rounded-t-xl md:rounded-l-xl md:rounded-r-none"
              />
              <div className="p-5 flex flex-col gap-2">
                <div className="flex flex-col justify-start items-start gap-2">
                  <p className="text-xl md:text-4xl">{item.name}</p>
                  <div className="flex gap-5 items-center">
                    {highestBid ? (
                      <div>
                        <p className="flex font-medium text-primary text-xl line-through">
                          {formatPrice(item.price)}
                        </p>
                        <p className="flex">Current highest bid</p>
                        <p className="text-indigo-300 flex text-2xl">
                          {formatPrice(highestBid.price)}
                        </p>
                        {item.sold ? (
                          !(user.username == item.seller.username) ? (
                            <p className="text-xl bg-green-600 text-white p-2 rounded-xl my-2 font-bold">Item has been sold ✅</p>
                          ) : (
                            <></>
                          )
                        ) : user.username == item.seller.username ? (
                          <SellButton/>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <p className="flex font-medium text-indigo-300 text-2xl">
                        {formatPrice(item.price)}
                      </p>
                    )}
                  </div>
                  <p className="flex gap-1 text-xs sm:text-sm md:text-base lg:text-xl items-center">
                    <span>Listed by</span>
                    <span className="text-blue-300 text-xl">
                      {item.seller.username}
                    </span>
                  </p>
                </div>
                <span className="flex text-xs lg:text-base">
                  On {formatDate(item.createdAt)}
                </span>
                {item.updatedAt != item.createdAt ? (
                  <p className="flex">
                    Updated on {formatDate(item.updatedAt)}
                  </p>
                ) : (
                  <></>
                )}
                {!isAuthenticated ? (
                  !item.sold ?
                  <a
                    href="/login"
                    className="flex btn bg-slate-200 hover:bg-slate-50 justify-start items-center normal-case text-black hover:text-black mt-5"
                  >
                    Login to bid on this item
                  </a>
                  :
                  <></>
                ) : item.seller.username != user?.username && !item.sold ? (
                  item?.bids.find(
                    (bid) => bid?.user?.username == user?.username
                  ) ? (
                    <UpdateBidModal id={item._id} />
                  ) : (
                    <BidModal id={item._id} />
                  )
                ) : (
                  <></>
                )}
                {item.bids.length > 0 ? (
                  <p className="flex font-medium text-lg">All bids</p>
                ) : (
                  <></>
                )}
                <div className="flex flex-col lg:flex-row gap-2">
                  {item.bids.length > 0 ? (
                    item.bids.map((bid, key) => {
                      return (
                        <div key={key}>
                          <div>
                            <p className="flex gap-4">
                              {bid?.user?.username}
                              <span className="text-indigo-400">
                                {bid?.price?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {item.seller.username == user?.username ? (
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
  }
};

export default ItemPage;
