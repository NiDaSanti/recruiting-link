import QRCode from 'qrcode'

const formURL = 'http://10.104.60.150/form'

QRCode.toFile('public/images/form_qr.png', formURL, {
  width: 300,
  margin: 2
}, (err) => {
  if(err) throw err
  console.log('QR Code generated form_qr.png')
})