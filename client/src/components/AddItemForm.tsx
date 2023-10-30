import { FieldValues, useForm } from "react-hook-form";
import { createItem } from "../api";
import { useNavigate } from "react-router-dom";

const AddItemForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const addItem = async (data: FieldValues) => {
    try{
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("image", data.image[0]); 
      const res = await createItem(formData);
      console.log(res);
      navigate("/")
    }
    catch(err){
      console.log(`${err}`)
    }
  };
  return (
    <div className="p-5 flex flex-col justify-start items-center">
      <p className="text-2xl">List an item</p>
      <form
        onSubmit={handleSubmit((data) => addItem(data))}
        className="flex flex-col justify-start items-start gap-5"
        encType="multipart/form-data"
      >
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          placeholder="enter item name"
          id="name"
          className="bg-transparent p-2 border rounded-md"
        />
        <label>Price</label>
        <input
          {...register("price")}
          placeholder="enter initial price"
          id="price"
          className="bg-transparent p-2 border rounded-md"
        />
        <label htmlFor="image">Image</label>
        <input
          {...register("image")}
          placeholder="upload image"
          type="file"
          id="image"
          accept="image/*"
          name="image"
          className="bg-transparent p-2 border rounded-md"
        />
        <button type="submit" className="bg-indigo-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
