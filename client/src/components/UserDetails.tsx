import { useEffect, useState } from "react";
import { getUserDetails } from "../api";
import { useSelector } from "react-redux";
import { RootState, UserType } from "../types";
import { formatPrice } from "../utils";

const TranscationHistory = () => {
  const [userDetails, setUserDetails] = useState<UserType>();
  const user_id = useSelector((state: RootState) => state.authData.user.id);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await getUserDetails(user_id);
      setUserDetails(res);
    };
    if (user_id) {
      fetchUserDetails();
    }
  }, [user_id]);
  console.log(userDetails);
  return (
    <div>
      <div className="flex justify-start flex-col items-start rounded-xl p-10 text-xl">
        <p className="underline">Username</p>
        {userDetails?.username}
        <p className="underline">Email</p>
        {userDetails?.email}
      </div>
      <div className="flex flex-col justify-start items-start gap-6">
        {userDetails && userDetails.itemsBought.length > 0 ? 
        <p className="text-xl underline">Items bought</p>
        :
        <></>
        }
        {userDetails?.itemsBought.map((item, key) => {
          return (
            <div className="flex gap-4 border rounded-xl p-4" key={key}>
              <img src={item.item.image.url} className="w-40" />
              <div>
              <p className="text-lg">{item.item.name}</p>
              <p className="flex text-sm">{formatPrice(item.price)  }</p>
              <p className="">{item.item.seller.username}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TranscationHistory;
