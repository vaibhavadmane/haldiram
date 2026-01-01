import { Suspense } from "react";
import ChocolatesClient from "@/app/ChocolatesClient";

export const dynamic = "force-dynamic"; // ⭐ THIS LINE IS REQUIRED

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ChocolatesClient />
    </Suspense>
  );
}
