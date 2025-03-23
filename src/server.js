import express from 'express'
import dotenv from 'dotenv'
import initializeDB from './db/database.js'
import formRoutes from './routes/formRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

initializeDB().then((db) => {
  app.locals.db = db

  app.use(express.static('public'))
  app.use('/', formRoutes)

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
