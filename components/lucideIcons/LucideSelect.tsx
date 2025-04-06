import React from 'react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { iconNames } from './iconNames';

import { SelectItem } from '@/components/ui/select';

const LucideSelect = () => {
   return (
      <>
         {iconNames.map((icon) => (
            <SelectItem key={icon} value={icon}>
               <DynamicIcon name={icon as IconName} /> {icon}
            </SelectItem>
         ))}
      </>
   );
};

export default LucideSelect;

import { icons } from 'lucide-react';

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
