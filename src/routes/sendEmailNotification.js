import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"santiago.nicholas.a@gmail.com",
    pass:"mvpl kylo jdxl syxu",
  }
})

const sendEmailNotification = (candidateName, candidateEmail) => {
  const mailOptions = {
    from: 'santiago.nicholas.a@gmail.com',
    to: 'santiago.nicholas.a@gmail.com',
    subject: 'You recieved a potential candidate',
    text: `A potential candidate has submitted a form: ${candidateName}\nEmail: ${candidateEmail}`,
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