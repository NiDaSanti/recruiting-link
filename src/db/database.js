import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'data.db')

const initializeDB = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  await db.exec(await (await import('fs')).promises.readFile(path.join(__dirname, 'schema.sql'), 'utf8'))

  console.log('✅ SQLite database initialized')
  return db
}

export default initializeDB