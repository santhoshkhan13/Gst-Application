import { Router } from 'express';
const router: Router = Router();


import Login from './login.routes';
import User from './user.routes';
import Invoice  from './invoice.routes';
import  Notification  from './notification.routes';


router.use('/login', Login)
router.use('/user', User)
router.use('/invoice', Invoice)
router.use('/notification', Notification)

export default router;