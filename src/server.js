import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// Serve static files (like CSS, images, and other assets) from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Serve the QR code page (qrCodePage.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'qrCodePage.html'));
})

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'))
})

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT}`))