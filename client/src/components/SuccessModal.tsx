import { useRef } from "react";

const SuccessModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="flex m-5">
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-600">Click to bid</button>
      <dialog className="modal p-10 backdrop-blur-sm" ref={modalRef}>
        <div className="bg-gray-900 w-1/2 p-10 rounded-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle bg-slate-200 hover:bg-white text-black absolute right-1/3">
              X
            </button>
          </form>
        </div>
        <img src='/check.svg'/>
      </dialog>
    </div>
  );
};

export default SuccessModal;
