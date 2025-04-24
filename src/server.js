import express from 'express'
import dotenv from 'dotenv'
import initializeDB from './db/database.js'
import formRoutes from './routes/formRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import path from 'path'


// Get __dirname in ES module context
const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initialize Database
initializeDB().then((db) => {
  app.locals.db = db

  // Resolve and log the public directory path
  const publicDirPath = path.join(__dirname, '..', 'public')
  console.log('Public Directory Path:', publicDirPath) // Log to check if the path is correct
  
  // Serve static files from the "public" folder
  app.use(express.static(publicDirPath))

  // Default route to serve qrCodePage.html
  app.get('/', (req, res) => {
    const filePath = path.join(publicDirPath, 'qrCodePage.html')
    console.log('Serving qrCodePage.html from:', filePath) // Log to check the file path
    res.sendFile(filePath) // Serving the main page
  })

  // Use formRoutes for handling form-related routes
  app.use('/form', formRoutes)
  
  // For handling dashboard
  app.use('/api/dashboard', dashboardRoutes)
  app.use('/dashboard', (req, res) => {
  res.sendFile(path.resolve('public/dashboard.html'))
})

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('Database initialization failed:', err)
  process.exit(1) // Exit if database initialization fails
})
