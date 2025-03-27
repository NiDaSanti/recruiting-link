import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import { fileURLToPath } from 'url'
import sendEmailNotification from './sendEmailNotification.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// const productionUrl = process.env.NODE_ENV === 'production' ? 'https://recruiting-link.onrender.com/' : 'http://localhost:3000/'
// router.use('/', (req, res, next) => {
//   const referer = req.get('Referer');

//   if (!referer || !referer.includes(productionUrl)) {
//     return res.status(403).send(`
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               background-color: #f4f4f4;
//               color: #333;
//               text-align: center;
//               padding: 50px;
//             }
//             h2 {
//               color: #d9534f;
//               font-size: 2em;
//               margin-bottom: 20px;
//             }
//             p {
//               font-size: 1.2em;
//               color: #555;
//             }
//             a {
//               display: inline-block;
//               margin-top: 20px;
//               font-size: 1.1em;
//               text-decoration: none;
//               color: #007bff;
//               padding: 10px 20px;
//               border: 2px solid #007bff;
//               border-radius: 5px;
//               background-color: #f8f9fa;
//             }
//             a:hover {
//               background-color: #007bff;
//               color: white;
//             }
//           </style>
//         </head>
//         <body>
//           <h2>❌ Access Denied</h2>
//           <p>Please return to homepage and tap/click on the link.</p>
//           <a href="/">Go to homepage</a>
//         </body>
//       </html>
//     `);
//   }

//   next();
// });


// Serve form.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'form.html'))
})

router.post('/submit-form', async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body
    const db = req.app.locals.db

    await db.run(
      `INSERT INTO candidates (first_name, last_name, email, phone)
       VALUES (?, ?, ?, ?)`,
      [first_name, last_name, email, phone]
    )

    const fullName = `${first_name} ${last_name}`
    sendEmailNotification(fullName, email)

    console.log(`✅ New candidate submitted: ${fullName} (${email})`)
    res.send(`<p style="color: green;">✅ Thank you, ${fullName}! Your application has been submitted.</p>`)
  } catch (error) {
    console.error('❌ Error saving candidate:', error)
    res.status(500).send(`<p style="color: red;">❌ Error submitting application. Try again.</p>`)
  }
})

export default router

  