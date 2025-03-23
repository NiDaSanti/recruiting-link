import QRCode from 'qrcode'

const formURL = 'http://localhost:3000/form'

QRCode.toFile('public/images/form_qr.png', formURL, {
  width: 300,
  margin: 2
}, (err) => {
  if(err) throw err
  console.log('QR Code generated form_qr.png')
})