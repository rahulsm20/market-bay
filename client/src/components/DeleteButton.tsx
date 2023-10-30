import { useNavigate } from "react-router-dom";
import { deleteItem } from "../api";

const DeleteButton = ({id}:{id:string|undefined}) => {
  const navigate = useNavigate()
  const handleDelete = async()=>{
    try{
      const res = await deleteItem(id)
      console.log(res)
      navigate("/")
    }
    catch(err){
      console.log(`Failed to delete item: ${err}`)
    }
  }
  return (
    <button onClick={handleDelete} className="btn btn-transparent hover:bg-red-600 bg-red-500 normal-case text-black btn-sm text-sm absolute lg:relative border mt-5"><img src="/trash.svg" className='w-4'/>Delete</button>
  );
};

export default DeleteButton;
