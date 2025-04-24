import {Router} from 'express'
import doctorcontroller from '../controller/doctorController.js'

const router = Router();

router.get('/', doctorcontroller.getAllDoctor)
router.get('/:cid', doctorcontroller.getDoctorId)

router.post('/create', doctorcontroller.createDoctor)

export default router;