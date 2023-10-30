import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewItem from "./pages/NewItem";
import Items from "./pages/Items";
import Item from "./pages/Item";
import Signup from "./pages/Signup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Items />}></Route>
      <Route path="/item/:id" element={<Item />}></Route>
      <Route path="/add" element={<NewItem />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
  );
}

export default App;
