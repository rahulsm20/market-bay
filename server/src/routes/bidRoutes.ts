import express from 'express'
import bidController from '../controllers/bidController'
import auth from '../middleware/auth'
const router = express.Router()

router.post(`/`,auth,bidController.addBid)
router.get(`/:id`,bidController.getBids)

export default router 