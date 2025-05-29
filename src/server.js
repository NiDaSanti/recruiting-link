import express from 'express'
import dotenv from 'dotenv'
import initializeDB from './db/database.js'
import formRoutes from './routes/formRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname in ES module context
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initialize DB
initializeDB().then((db) => {
  app.locals.db = db

  const publicDirPath = path.join(__dirname, '..', 'public')
  console.log('✅ Serving static files from:', publicDirPath)

  // ✅ Serve static files
  app.use(express.static(publicDirPath))

  // ✅ Route: root page
  app.get('/', (req, res) => {
    const filePath = path.join(publicDirPath, 'qrCodePage.html')
    res.sendFile(filePath)
  })

  // ✅ Route: dashboard page (FIXED here)
  app.get('/dashboard', (req, res) => {
    const dashboardPath = path.join(publicDirPath, 'dashboard.html')
    console.log('✅ Serving dashboard from:', dashboardPath)
    res.sendFile(dashboardPath)
  })

  // ✅ Route groups
  app.use('/form', formRoutes)
  app.use('/api/dashboard', dashboardRoutes)

  // ✅ Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('❌ Failed to init DB:', err)
  process.exit(1)
})
