import express from 'express'
import path from 'path'

const router = express.Router()

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'qrCodePage.html'))
})

export default router