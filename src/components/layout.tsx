import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center space-y-6 p-24 ${inter.className}`}
    >
      {children}
    </main>
  );
};
