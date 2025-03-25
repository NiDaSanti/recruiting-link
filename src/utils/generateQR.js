import dotenv from 'dotenv'
dotenv.config()
import QRCode from 'qrcode'

const formURL = process.env.NODE_ENV === 'production' ? 'https://recruiting-link.onrender.com/form' : 'http://localhost:3000/form'

QRCode.toFile('public/images/form_qr.png', formURL, {
  width: 300,
  margin: 2
}, (err) => {
  if(err) throw err
  console.log('QR Code generated form_qr.png')
})