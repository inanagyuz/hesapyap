import { jwtVerify, SignJWT } from 'jose';

const secretKey = process.env.NEXT_PUBLIC_API_TOKEN; // Gizli anahtarınızı buraya koyun

const createBearerToken = async () => {
   const secret = new TextEncoder().encode(secretKey); // Gizli anahtar
   const token = await new SignJWT({ api: 'hesapyapnet' }) // Payload
      .setProtectedHeader({ alg: 'HS256' }) // Algoritma
      .setIssuedAt() // Token oluşturulma zamanı
      .setExpirationTime('1h') // Token geçerlilik süresi
      .sign(secret); // İmzalama
   return `Bearer ${token}`;
};

const verifyBearerToken = async (token: string) => {
   if (!token || typeof token !== 'string') return false; // Token formatı geçersiz
   if (!token.startsWith('Bearer ')) return false; // Token formatı geçersiz
   if (!token.startsWith('Bearer ')) return false; // Token formatı geçersiz
   if (!secretKey) return false; // Gizli anahtar yok
   if (token.split(' ').length !== 2) return false; // Token formatı geçersiz
   const bearerToken = token.split(' ')[1]; // Bearer token
   if (!bearerToken) return false; // Token yok
   const secret = new TextEncoder().encode(secretKey); // Gizli anahtar
   const { payload } = await jwtVerify(bearerToken, secret); // Token doğrulama
   if (!payload) return false; // Token geçersiz
   if (payload.api !== 'hesapyapnet') return false; // Token geçersiz
   if (payload.exp && payload.exp < Date.now() / 1000) return false; // Token süresi dolmuş

   return true;
};
export { createBearerToken, verifyBearerToken };
