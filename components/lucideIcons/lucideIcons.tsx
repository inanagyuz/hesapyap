import { icons } from 'lucide-react';
import { iconNames } from './iconNames';

export interface IconProps {
   name: keyof typeof icons; // İkon ismi, `icons` nesnesindeki anahtarlar olmalı
   color?: string; // İkon rengi, opsiyonel
   size?: string | number; // İkon boyutu, opsiyonel
}

export const iconsProps = icons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

export const Icon: React.FC<IconProps> = ({ name, color, size }) => {
   const LucideIcon = icons[name];

   // İkon bulunamazsa, bir fallback davranışı ekleyebilirsiniz
   if (!LucideIcon) {
      console.error(`Icon "${name}" not found in lucide-react`);
      return null;
   }

   return <LucideIcon color={color} size={size} />;
};

import { SelectItem } from '@/components/ui/select';

export const LucideSelect = () => {
   return (
      <>
         {iconNames.map((icon) => (
            <SelectItem key={icon} value={icon}>
               <Icon name={icon as keyof typeof icons} size={16} /> {icon}
            </SelectItem>
         ))}
      </>
   );
};
