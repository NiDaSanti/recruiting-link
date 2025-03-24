import express from 'express'
import dotenv from 'dotenv'
import initializeDB from './db/database.js'
import formRoutes from './routes/formRoutes.js'
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

  // Serve static files from the "public" folder in the root directory
  app.use(express.static(path.join(__dirname, '../..', 'public'))) // Static files

  // Default route to serve qrCodePage.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'qrCodePage.html')) // Serving the main page
  })

  // Use formRoutes for handling form-related routes
  app.use('/form', formRoutes) // Handling '/form' routes

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('Database initialization failed:', err)
  process.exit(1) // Exit if database initialization fails
})
