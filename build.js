const fs = require('fs')
const path = require('path')

// Copy type declarations and SQL files
const filesToCopy = [
  'src/types/next-auth.d.ts',
  'src/schema.sql'
]

filesToCopy.forEach(file => {
  const source = path.join(__dirname, file)
  const dest = path.join(__dirname, 'dist', file.replace('src/', ''))
  
  // Create directory if it doesn't exist
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Copy file
  fs.copyFileSync(source, dest)
}) 