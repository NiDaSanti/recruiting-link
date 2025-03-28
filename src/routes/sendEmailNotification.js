import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

const isProduction = process.env.NODE_ENV === 'production'

const transporter = nodemailer.createTransport({
  service: isProduction ? process.env.PRODUCTION_EMAIL_SERVICE : process.env.DEVELOPMENT_EMAIL_SERVICE,
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  }
})
const sendEmailNotification = (candidateName, candidateEmail) => {
  const mailOptions = {
    from: isProduction ? process.env.PRODUCTION_EMAIL_USER : process.env.DEVELOPMENT_EMAIL_USER,
    to: isProduction ? process.env.PRODUCTION_EMAIL_USER : process.env.DEVELOPMENT_EMAIL_USER,
    subject: 'You recieved a potential candidate',
    text: `A potential candidate has submitted a form: \n${candidateName}\nEmail: ${candidateEmail}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log('Error sending email: ', error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export default sendEmailNotification