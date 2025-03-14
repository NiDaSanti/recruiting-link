import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import initializeDB from './db/database.js'
import formRoutes from './routes/formRoutes.js'
import qrCodeRoute from './routes/qrCodeRoute.js'

dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/', qrCodeRoute)
app.use('/', formRoutes)

initializeDB().then(db => {
    app.locals.db = db
    console.log('✅ Database connected')
}).catch(err => console.error('❌ Database error:', err))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
