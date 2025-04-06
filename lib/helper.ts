export async function hashPassword(password: string) {
   const encoder = new TextEncoder();
   const data = encoder.encode(password);
   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
   const hashArray = Array.from(new Uint8Array(hashBuffer));
   const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
   return hashHex;
}

export async function verifyPassword(inputPassword: string, storedHash: string) {
   const inputHash = await hashPassword(inputPassword);
   return inputHash === storedHash;
}

export function dateFormater(dateString: Date | undefined, locale?: string) {
   if (!dateString) return '';
   const date = new Date(dateString);
   return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
   }).format(date);
}
export function dateFormaterDay(dateString: Date | undefined, locale?: string) {
   if (!dateString) return '';
   const date = new Date(dateString);
   return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   }).format(date);
}

export async function evds2DateFormat({
   date,
   locale = 'tr-TR',
   daysToSubtract,
   daysToAdd,
}: {
   date: Date;
   locale?: string;
   daysToSubtract?: number;
   daysToAdd?: number;
}) {
   // Gün çıkarma işlemi
   if (daysToSubtract !== undefined) {
      date.setDate(date.getDate() - daysToSubtract);
   }
   // Gün ekleme işlemi
   if (daysToAdd !== undefined) {
      date.setDate(date.getDate() + daysToAdd);
   }

   const formattedDate = date
      .toLocaleDateString(locale, {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
      .replace(/\./g, '-');

   return formattedDate;
}

/*
 * verilen dil ve id'ye göre doğru slug sütununu seç
 */
export const whereClause = (id: string) => {
   return {
      OR: [{ slug: id }, { slugen: id }, { slugde: id }],
   };
};

// Para birimi formatlama
export const formatCurrency = ({ value, currency }: { value: number; currency?: string }) => {
   if (!currency) currency = 'TRY';
   return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: currency }).format(value);
};
