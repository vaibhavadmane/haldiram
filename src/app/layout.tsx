import { ReactNode } from "react";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster
import "./main.css"

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* ✅ This allows toast messages to appear on any page */}
        <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            // Optional: set a high z-index to ensure it's above your header/modals
            style: {
              zIndex: 9999,
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}