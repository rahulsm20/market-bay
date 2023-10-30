import {Router} from 'express'
import { signin, signup } from '../controllers/userController'
import auth from '../middleware/auth'

const router  = Router()

router.post('/verify',auth)
router.post('/signup',signup)
router.post('/login',signin)
export default router