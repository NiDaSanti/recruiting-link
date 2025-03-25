import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import sendEmailNotification from './sendEmailNotification.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// router.use('/form', (req, res, next) => {
//   const referer = req.get('Referer');

//   if (!referer || !referer.includes('localhost:3000')) {
//       return res.status(403).send(`
//           <h2 style="color: red;">❌ Access Denied</h2>
//           <p>Please scan the QR code to access this form.</p>
//           <a href="/">Go to homepage</a>
//       `)
//   }

//   next()
// })

// Serve form.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'form.html'))
})

router.post('/submit-form', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, position, resume_url } = req.body
    const db = req.app.locals.db

    await db.run(
      `INSERT INTO candidates (first_name, last_name, email, phone, position_applied, resume_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone, position, resume_url]
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

  