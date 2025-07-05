import {Router} from 'express'
import diseaseController from '../controller/diseasePackageController.js'

let router = Router()

router.get('/', diseaseController.getAllDisease)
router.post('/create', diseaseController.createDisease)

export default router;