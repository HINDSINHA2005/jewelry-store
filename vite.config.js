import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // ensures service worker updates automatically
      manifest: {
        name: 'Jewelora',
        short_name: 'Jewelora',
        description: 'Your Jewelry Store',
        start_url: '/',
        display: 'standalone', // ✅ full-screen app-like mode
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/', // ✅ keep this for Netlify deployment
})
