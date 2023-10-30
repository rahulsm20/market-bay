import express from "express";
import { connect } from "./db/connect";
import {createServer} from "node:http"; 
import {Server} from "socket.io"; 
const app = express();
const server = createServer(app); 
import dotenv from "dotenv"
import userRoutes from "./routes/users";
import itemsRoutes from "./routes/items";
import cors from "cors";
const port = process.env.SERVER_PORT

dotenv.config();
app.use(cors());
app.use(express.json());
connect(process.env.DB_URL || "");


app.get("/", (req, res) => {
  res.json("Home");
});

const io = new Server(server,{
  pingTimeout:60000,
  cors:{
    origin:["http://localhost:5000"]
  }
});
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use("/auth", userRoutes);
app.use("/items", itemsRoutes);



export default app;
