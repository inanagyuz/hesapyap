/* eslint-disable @typescript-eslint/no-unused-vars */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Desteklenen dillerin anahtarlarını belirleriz
// Desteklenen dillerin anahtarlarını belirleriz
type Locale =
   | 'tr' // Türkçe
   | 'en' // İngilizce
   | 'us' // Amerikan İngilizcesi
   | 'fr' // Fransızca
   | 'de' // Almanca
   | 'es' // İspanyolca
   | 'it' // İtalyanca
   | 'jp' // Japonca
   | 'cn' // Çince
   | 'ru' // Rusça
   | 'kr' // Korece
   | 'in' // Hintçe
   | 'br' // Portekizce (Brezilya)
   | 'mx' // İspanyolca (Meksika)
   | 'ar' // Arapça
   | 'sa' // Arapça (Suudi Arabistan)
   | 'ca' // Fransızca (Kanada)
   | 'au' // İngilizce (Avustralya)
   | 'at' // Almanca (Avusturya)
   | 'be' // Fransızca (Belçika)
   | 'ch' // Almanca (İsviçre)
   | 'gr' // Yunan
   | 'nl' // Felemenkçe (Hollanda)
   | 'pt' // Portekizce
   | 'ie' // İrlandaca
   | 'ng' // Nijerya
   | 'nz' // Yeni Zelanda
   | 'za' // Güney Afrika
   | 'eg' // Mısır
   | 'pk' // Pakistan
   | 'id' // Endonezya
   | 'my' // Malezya
   | 'ph' // Filipinler
   | 'sg' // Singapur
   | 'il' // İsrail
   | 'dk' // Danca (Danimarka)
   | 'fi' // Fince (Finlandiya)
   | 'no' // Norveççe
   | 'se' // İsveççe
   | 'ua' // Ukraynaca
   | 'bg' // Bulgarca
   | 'ro' // Romence
   | 'cz' // Çekçe
   | 'sk' // Slovakça
   | 'hu' // Macarca
   | 'lt' // Litvanyaca
   | 'lv' // Letonca
   | 'si' // Slovence
   | 'hr' // Hırvatça
   | 'et' // Estonca
   | 'is' // İzlandaca
   | 'mt' // Maltaca
   | 'hy' // Ermenice
   | 'ka' // Gürcüce
   | 'ba' // Boşnakça
   | 'sr' // Sırpça
   | 'az' // Azerice
   | 'kk' // Kazakça
   | 'tg' // Tacikçe
   | 'ky' // Kırgızca
   | 'uz' // Özbekçe
   | 'mn' // Moğolca
   | 'am' // Amharca
   | 'sw' // Swahili
   | 'zu' // Zulu
   | 'xh' // Xhosa
   | 'yo' // Yoruba
   | 'ha' // Hausa
   | 'lg' // Ganda
   | 'rw' // Kinyarwanda
   | 'mg' // Malgaşca
   | 'ht' // Haiti
   | 'cr' // Cree
   | 'ak' // Akan
   | 'ab' // Abhazca
   | 'tt' // Tatar
   | 'kv' // Komi
   | 'su' // Sunda
   | 'bi' // Bislama
   | 'kl' // Kalaallisut
   | 'as' // Assamca
   | 'tn' // Tswana
   | 'ne' // Nepali
   | 'pa' // Pencapça
   | 'ku' // Kürtçe   |
   | 'ks' // Keşmirce
   | 'te' // Telugu
   | 'ta' // Tamil
   | 'ml' // Malayalam
   | 'or' // Oriya
   | 'bn' // Bengalce
   | 'gu' // Gujarati
   | 'jw' // Jawa
   | 'sh' // Sırpça
   | 'mk' // Makedonca
   | 'sc' // Sardunya
   | 'eu' // Baskça
   | 'sm' // Samoa
   | 'fj' // Fijice
   | 'na' // Nauru
   | 'to' // Tonga
   | 'ki' // Kiribati
   | 'vu' // Vanuatu
   | 'mh' // Marshall Adaları
   | 'fm' // Mikronezya
   | 'pw' // Palau
   | 'nr' // Güney Ndebele
   | 'st' // Sesotho
   | 'sn' // Şona   |
   | 've' // Venda
   | 'tl' // Tagalog
   | 'dz' // Dzongkha
   | 'ko' // Korece
   | 'jv' // Cava
   | 'mr' // Marathi
   | 'sq' // Arnavutça
   | 'ja' // Japonca
   | 'pl' // Lehçe
   | 'uk' // Ukraynaca
   | 'vi'; // Vietnamca;

// Dil kodlarına göre bayrak simgelerini tanımlarız
const flags: Record<Locale, string> = {
   tr: '🇹🇷',
   en: '🇬🇧',
   us: '🇺🇸',
   fr: '🇫🇷',
   de: '🇩🇪',
   es: '🇪🇸',
   it: '🇮🇹',
   jp: '🇯🇵',
   cn: '🇨🇳',
   ru: '🇷🇺',
   kr: '🇰🇷',
   in: '🇮🇳',
   br: '🇧🇷',
   mx: '🇲🇽',
   ar: '🇦🇷',
   sa: '🇸🇦',
   ca: '🇨🇦',
   au: '🇦🇺',
   at: '🇦🇹',
   be: '🇧🇪',
   ch: '🇨🇭',
   gr: '🇬🇷',
   nl: '🇳🇱',
   pt: '🇵🇹',
   ie: '🇮🇪',
   ng: '🇳🇬',
   nz: '🇳🇿',
   za: '🇿🇦',
   eg: '🇪🇬',
   pk: '🇵🇰',
   id: '🇮🇩',
   my: '🇲🇾',
   ph: '🇵🇭',
   sg: '🇸🇬',
   il: '🇮🇱',
   dk: '🇩🇰',
   fi: '🇫🇮',
   no: '🇳🇴',
   se: '🇸🇪',
   ua: '🇺🇦',
   bg: '🇧🇬',
   ro: '🇷🇴',
   cz: '🇨🇿',
   sk: '🇸🇰',
   hu: '🇭🇺',
   lt: '🇱🇹',
   lv: '🇱🇻',
   si: '🇸🇮',
   hr: '🇭🇷',
   et: '🇪🇪',
   is: '🇮🇸',
   mt: '🇲🇹',
   hy: '🇦🇲',
   ka: '🇬🇪',
   ba: '🇧🇦',
   sr: '🇷🇸',
   az: '🇦🇿',
   kk: '🇰🇿',
   tg: '🇹🇯',
   ky: '🇰🇬',
   uz: '🇺🇿',
   mn: '🇲🇳',
   am: '🇦🇲',
   sw: '🇰🇪',
   zu: '🇿🇦',
   xh: '🇿🇦',
   yo: '🇳🇬',
   ha: '🇳🇬',
   lg: '🇺🇬',
   rw: '🇷🇼',
   mg: '🇲🇬',
   ht: '🇭🇹',
   cr: '🇨🇦',
   ak: '🇬🇭',
   ab: '🇦🇿',
   tt: '🇷🇺',
   kv: '🇷🇺',
   su: '🇸🇷',
   bi: '🇧🇻',
   kl: '🇬🇱',
   as: '🇮🇳',
   tn: '🇿🇦',
   ne: '🇳🇵',
   pa: '🇮🇳',
   ku: '🇹🇷',
   ks: '🇵🇰',
   te: '🇮🇳',
   ta: '🇮🇳',
   ml: '🇮🇳',
   or: '🇮🇳',
   bn: '🇧🇩',
   gu: '🇮🇳',
   jw: '🇮🇩',
   sh: '🇷🇸',
   mk: '🇲🇰',
   sc: '🇮🇹',
   eu: '🇪🇸',
   sm: '🇼🇸',
   fj: '🇫🇯',
   na: '🇳🇷',
   to: '🇹🇴',
   ki: '🇰🇷',
   vu: '🇻🇺',
   mh: '🇲🇭',
   fm: '🇫🇲',
   pw: '🇵🇼',
   nr: '🇿🇦',
   st: '🇱🇸',
   sn: '🇿🇦',
   ve: '🇿🇦',
   tl: '🇵🇭',
   dz: '🇧🇹',
   ko: '🇰🇷',
   jv: '🇮🇩',
   mr: '🇮🇳',
   sq: '🇦🇱',
   ja: '🇯🇵',
   pl: '🇵🇱',
   uk: '🇺🇦',
   vi: '🇻🇳',
};

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url); // URL sorgu parametrelerini al
   const color = searchParams.get('c') || 'white'; // Arka plan rengi
   const width = parseInt(searchParams.get('w') || '128', 10); // Genişlik
   const height = parseInt(searchParams.get('h') || '94', 10); // Yükseklik
   const fontSize = parseInt(searchParams.get('f') || (width - 8).toString(), 10); // Yazı boyutu
   const flag = (searchParams.get('fl') as Locale) || 'tr'; // Bayrak kodu
   const flagImage = flags[flag]; // Bayrak simgesi

   return new ImageResponse(
      (
         <div
            style={{
               fontSize: 60,
               //background: color,
               width: '100%',
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               fontFamily: 'sans-serif',
            }}
         >
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <span style={{ fontSize: fontSize }}>{flagImage}</span>
            </div>
         </div>
      ),
      {
         width: width,
         height: height,
      }
   );
}
