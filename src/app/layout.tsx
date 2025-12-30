<<<<<<< HEAD
import { ReactNode } from "react";
import "./main.css"
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
=======
// app/layout.tsx
import "./globals.css";
// import Navbar from "../src/components/Navbar";
// import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Haldiram Clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <main>{children}</main>
      </body>
>>>>>>> a202d684579ba29ca0c2af85aed185618c2106a0
    </html>
  );
}
