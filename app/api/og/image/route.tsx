import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { Percent } from 'lucide-react';

export const runtime = 'edge';

async function loadGoogleFont(font: string, text: string) {
   const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
   const css = await (await fetch(url)).text();
   const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

   if (resource) {
      const response = await fetch(resource[1]);
      if (response.status == 200) {
         return await response.arrayBuffer();
      }
   }
}

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url); // URL sorgu parametrelerini al
   const color = searchParams.get('c') || 'blue'; // Arka plan rengi
   const background = searchParams.get('bg') || ''; // Arka plan rengi
   const fontSize = parseInt(searchParams.get('f') || '48'); // Yazı boyutu
   const fontSizenet = fontSize / 2;
   const fonstSizeLogo = (4 * fontSize) / 3;
   const width = fontSize * 8;
   const height = fontSize * 2;
   const text = 'Hesapyap.net';

   // Stil nesnesini oluştur
   const containerStyle: React.CSSProperties = {
      fontSize: fontSize,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
   };

   const innerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      padding: '8px 8px',
      fontWeight: 700,
      fontFamily: 'Lobster',
      //boxShadow: '0 0 0 4px rgba(0,0,255,0.70)',
   };

   // background boş değilse innerStyle'a ekle
   if (background) {
      innerStyle.background = background;
   }

   return new ImageResponse(
      (
         <div style={containerStyle}>
            <div style={innerStyle}>
               <span
                  style={{
                     marginRight: 8,
                     background: 'lightgray',
                     borderRadius: '50%',
                     fontSize: fonstSizeLogo,
                     padding: 0,
                  }}
               >
                  <Percent style={{ padding: 8 }} />
               </span>
               <span style={{ fontSize: fontSize, fontWeight: 900, alignItems: 'baseline' }}>
                  Hesapyap
                  <span style={{ fontSize: fontSizenet, fontWeight: 900 }}>.net</span>
               </span>
            </div>
         </div>
      ),
      {
         width: width,
         height: height,
         fonts: [
            {
               name: 'Lobster',
               data: (await loadGoogleFont('Lobster', text)) || new ArrayBuffer(0),
               style: 'normal',
            },
         ],
      }
   );
}
