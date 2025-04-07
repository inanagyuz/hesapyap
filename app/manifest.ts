export const dynamic = 'force-dynamic';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: 'Hesapyap.net',
      short_name: 'Hesapyap.net',
      description: 'Hesapyap.net - Pratik Hesaplama ve Dönüşüm Araçları',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
         {
            src: '/icon.tsx',
            sizes: 'any',
            type: 'image/x-icon',
         },
      ],
   };
}
