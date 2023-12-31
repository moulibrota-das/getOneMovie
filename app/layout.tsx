"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/context/authContext";
import appwriteService from "@/appwrite/config";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    appwriteService.isLoggedIn().then((status) => setAuthStatus(status));
  }, []);

  return (
    <html lang="en" className="snap-mandatory snap-y">
      <AuthProvider value={{ authStatus, setAuthStatus }}>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
