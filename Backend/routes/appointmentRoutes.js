import {Router} from 'express'
import appointmentcontroller from '../controller/appointmentController.js'

const router = Router();

router.get('/', appointmentcontroller.getAllAppointment)
router.get('/:cid', appointmentcontroller.getAppointmentId)

router.post('/create', appointmentcontroller.createAppointment)
router.delete('/:cid', appointmentcontroller.deleteAppointment);

export default router;