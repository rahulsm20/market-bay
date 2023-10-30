import { Router } from "express";
import itemController from "../controllers/itemController";
import multer from "multer";
import auth from "../middleware/auth";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", auth, upload.single("image"), itemController.createItem);
router.get("/", itemController.getItems);
router.get("/:id", itemController.getItemById);
router.delete("/:id", auth, itemController.deleteItem);
router.post(`/:id`, auth, itemController.addBid);
router.patch(`/:id`, auth, itemController.updateBid);
router.post(`/sell/:id`, auth, itemController.sellItem);
export default router;
