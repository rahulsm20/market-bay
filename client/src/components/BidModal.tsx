import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBid } from "../api";
import { updateBids } from "../store/itemSlice";

const BidModal = ({ id }: { id: string }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [added, setAdded] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  // const closeModal = () => {
  //   if (modalRef.current) {
  //     modalRef.current.close();
  //   }
  // };
  const bidsHandler = async (data: FieldValues, id: string) => {
    try {
      const bids = await addBid(data, id);
      dispatch(updateBids(bids));
      setAdded(true)
      // closeModal()
    } catch (err) {
      console.log(`${err}`);
    }
  };
  return (
    <div className="flex m-5">
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-600">
        Click to bid
      </button>
      <dialog className="modal p-10 backdrop-blur-sm" ref={modalRef}>
        <div className="bg-gray-900 w-1/2 p-10 rounded-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle bg-slate-200 hover:bg-white text-black absolute right-1/3">
              X
            </button>
          </form>
          <div>
            {added ? (
              <div className="flex gap-4 items-center">
                <img src="/check.svg" className="w-12"/>
              <p>Bid added</p>
              </div>
            ) : (
              <form
                className="flex flex-col  items-center gap-5"
                onSubmit={handleSubmit((data) => bidsHandler(data, id))}
              >
                <input
                  {...register("price")}
                  placeholder="enter bid amount"
                  className="p-2 rounded-md bg-transparent border"
                  type="number"
                />
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BidModal;
