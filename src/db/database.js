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

// Resolve full path relative to project
const dbPath = path.resolve(__dirname, '..', '..', dbRelativePath)

const initializeDB = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8')
    await db.exec(schema)

    console.log(`✅ ${env.toUpperCase()} database initialized at ${dbPath}`)

    if (dbPath.includes('data.db')) {
      throw new Error('❌ Unexpected attempt to use data.db — check your environment and paths!')
    }
    
    return db
  } catch (err) {
    console.error('❌ Database error:', err)
    throw err
  }
}

export default initializeDB
