import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'EduManage School System',
        short_name: 'EduManage',
        description: 'Modern School Management System',
        theme_color: '#0057ff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
