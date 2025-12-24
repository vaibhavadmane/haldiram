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
    </html>
  );
}
