import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const text = searchParams.get('text') || 'Hesapyap.net';

   return new ImageResponse(
      (
         <div
            style={{
               fontSize: 60,
               color: 'black',
               background: 'white',
               width: '100%',
               height: '100%',
               display: 'flex',
               textAlign: 'center',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            {text}
         </div>
      ),
      {
         width: 1200,
         height: 630,
      }
   );
}
