import diseaseController from '../controller/diseasePackageController.js'
import {Router} from 'express'

let router = Router()

router.get('/', diseaseController.getAllDisease)
router.post('/create', diseaseController.createDisease)

export default router;