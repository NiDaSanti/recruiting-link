import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("API is running...");
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT}`))