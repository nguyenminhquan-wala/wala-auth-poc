const fs = require('fs')
const path = require('path')

// Copy type declarations
const filesToCopy = [
  'src/types/next-auth.d.ts'
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

// Remove any SQL files from dist directory
const distDir = path.join(__dirname, 'dist')
const files = fs.readdirSync(distDir)
files.forEach(file => {
  if (file.endsWith('.sql')) {
    fs.unlinkSync(path.join(distDir, file))
  }
}) 