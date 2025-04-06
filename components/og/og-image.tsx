import Image from 'next/image';

export function TextImage() {
   return (
      <Image
         src="/api/og/text?text=İnan Ağyüz"
         alt="İnan Ağyüz"
         width={800}
         height={600}
         priority
         style={{ width: 'auto', height: 'auto' }}
      />
   );
}

export function LogoImage() {
   return (
      <Image
         src="/api/og/logo"
         alt="Logo"
         width={500}
         height={630}
         property="og:image"
         style={{ width: 'auto', height: 'auto' }}
      />
   );
}
