import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // Edge Runtime kullanımı önerilir

// Resim boyutları
export const size = {
   width: 32,
   height: 32,
};
export const alt = 'HY';

export const contentType = 'image/png';

// Resim oluştur
export default function Icon() {
   return new ImageResponse(
      (
         // Resim içeriği
         <div
            style={{
               fontSize: 24,
               background: 'blue',
               width: '100%',
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               color: 'white',
            }}
         >
            HY
         </div>
      ),
      // Resim boyutları
      {
         ...size,
      }
   );
}
