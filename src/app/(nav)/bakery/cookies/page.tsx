import { Suspense } from "react";
import CookiesClient from "./CookiesClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading cookies...</div>}>
      <CookiesClient />
    </Suspense>
  );
}
