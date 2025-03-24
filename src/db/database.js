import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fs from 'fs/promises'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Choose database path based on environment
const env = process.env.NODE_ENV || 'development'
const dbRelativePath =
  env === 'production' ? process.env.PRODUCTION_DB_PATH : process.env.DEVELOPMENT_DB_PATH
  
// Add fallback if dbRelativePath is undefined
if (!dbRelativePath) {
  throw new Error(`Database path is not defined. Make sure your .env file has the correct DB path.`)
}

// Resolve full path relative to project
const dbPath = path.resolve(__dirname, '../..', dbRelativePath)

const initializeDB = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

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
