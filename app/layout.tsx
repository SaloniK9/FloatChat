import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "FloatChat",
  description: "Connect, Research, and Collaborate Seamlessly",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen text-gray-800">
        {/* 🔹 Header (once for all pages) */}
        
         <main>{children}</main>
      </body>
    </html>
  );
}
