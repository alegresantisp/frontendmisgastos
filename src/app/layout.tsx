import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWithSidebar from "@/components/LayoutWithSidebar";
import { AuthProvider } from "@/components/Context/AuthContext";
import { CategoriesProvider } from "@/components/Context/CategoriesContext";
import { ExpensesProvider } from "@/components/Context/ExpensesContext";
import { StatisticsProvider } from "@/components/Context/StatisticsContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PocketCare",
  description: "Generated by SAS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <AuthProvider>
          <CategoriesProvider>
            <ExpensesProvider>
              <StatisticsProvider> {/* Agrega el StatisticsProvider */}
                <LayoutWithSidebar>{children}</LayoutWithSidebar>
              </StatisticsProvider>
            </ExpensesProvider>
          </CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
