import React from 'react';

const singInLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
         {children}
      </main>
   );
};

export default singInLayout;
