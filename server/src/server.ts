import express from "express";
import { connect } from "./db/connect";
const app = express();
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import itemsRoutes from "./routes/items";
import bidRoutes from "./routes/bidRoutes";
import cors from "cors";
const port = process.env.SERVER_PORT
dotenv.config();
app.use(cors());
app.use(express.json());
connect(process.env.DB_URL || "");
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.json("Home");
});

app.use("/auth", userRoutes);
app.use("/items", itemsRoutes);
app.use("/bids", bidRoutes);

export default app;
