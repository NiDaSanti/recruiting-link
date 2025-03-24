import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fs from 'fs/promises'

// Load environment variables
dotenv.config()

// Resolve the file path to the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Choose database path based on the environment (development/production)
const env = process.env.NODE_ENV || 'development'

// Make sure you are correctly reading paths from the .env file
const dbRelativePath =
  env === 'production' ? process.env.PRODUCTION_DB_PATH : process.env.DEVELOPMENT_DB_PATH

// Resolve the full path relative to your project root (adjust for 'src' folder location)
const dbPath = path.resolve(__dirname, '../..', dbRelativePath)

const initializeDB = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    // Read schema.sql and initialize the DB if needed
    const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8')
    await db.exec(schema)

    console.log(`✅ ${env.toUpperCase()} database initialized at ${dbPath}`)
    return db
  } catch (err) {
    console.error('❌ Database error:', err)
    throw err
  }
}

export default initializeDB
