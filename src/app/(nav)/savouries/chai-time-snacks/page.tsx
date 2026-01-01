import { Suspense } from "react";
import ChaiTimeClient from "./ChaiTimeClient";

export const dynamic = "force-dynamic"; // ⭐ REQUIRED

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading snacks...</div>}>
      <ChaiTimeClient />
    </Suspense>
  );
}
