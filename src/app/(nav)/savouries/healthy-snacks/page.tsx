import { Suspense } from "react";

import HealthySnacksClient from "./HealthySnacksClient"

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading cookies...</div>}>
      <HealthySnacksClient />
    </Suspense>
  );
}
