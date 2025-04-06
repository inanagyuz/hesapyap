import Image from 'next/image';

interface LogoImageProps {
   fs: number;
   c?: string;
   bg?: string;
}

export async function LogoImage({ fs, c, bg }: LogoImageProps) {
   const fontSize = fs;
   let src = `/api/og/logo?`;
   if (fs) {
      src += `&f=${fs}`;
   }
   if (c) {
      src += `&c=${c}`;
   }
   if (bg) {
      src += `&bg=${bg}`;
   }

   return (
      <Image
         src={src}
         alt="Hesapyap.net"
         width={fontSize * 8}
         height={fontSize * 2}
         property="og:image"
         style={{ width: 'auto', height: 'auto' }}
      />
   );
}
