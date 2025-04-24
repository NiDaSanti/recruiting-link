import express from 'express'
import { getCandidates, deleteCandidate } from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/candidates', getCandidates)
router.delete('/candidates/:id', deleteCandidate)

export default router