import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { login, signup, verify } from "../api";
const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false)
  const handleSignup = async (data: FieldValues) => {
    setLoading(true);
    try {
      await signup(data);
      const result = await login(data);
      const isAuthenticated = await verify(result.token);
      sessionStorage.setItem("access_token", result.token);
      sessionStorage.setItem("user", JSON.stringify(isAuthenticated.user));
      window.location.replace("/")
    } catch (err) {
        setError(true)
        console.log(`${err}`);
    }
    setLoading(false);
  };
  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <p className="text-xl font-semibold">Signup</p>
      <form
        className="flex flex-col justify-start items-start gap-5  p-5 rounded-md"
        onSubmit={handleSubmit((data) => handleSignup(data))}
      >
        <label>Username</label>
        <input
          className="p-2 rounded-lg bg-transparent border"
          placeholder="enter email"
          type="username"
          {...register("username")}
        />
        <label>Email</label>
        <input
          className="p-2 rounded-lg bg-transparent border"
          placeholder="enter email"
          type="email"
          {...register("email")}
        />
        <label>Password</label>
        <input
          className="p-2 rounded-lg bg-transparent border"
          placeholder="enter password"
          type="password"
          {...register("password")}
        />
        {loading ? (
          <button type="submit" className="bg-indigo-500">
            Processing
          </button>
        ) : (
          <button type="submit" className="bg-indigo-500">
            Submit
          </button>
        )}
        {error ? <p className="text-red-500">Please enter valid credentials</p> : <></>}
      </form>
    </div>
  );
};

export default SignupForm;
