import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imageDir = path.resolve(__dirname, 'image')
export default defineConfig({
  plugins: [
    vue(),
    // 开发时从项目根目录的 image 文件夹提供 /image 静态资源
    {
      name: 'serve-image',
      configureServer(server) {
        server.middlewares.use('/image', (req, res, next) => {
          const decoded = decodeURIComponent(req.url || '')
          const filePath = path.resolve(imageDir, decoded.replace(/^\//, '').replace(/\.\./g, ''))
          if (!filePath.startsWith(imageDir) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            return next()
          }
          const ext = path.extname(filePath)
          const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml' }
          res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
          fs.createReadStream(filePath).pipe(res)
        })
      },
    },
  ],
})