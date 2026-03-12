"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresh({ intervalMs = 60000 }: { intervalMs?: number }) {
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh(); // Tells Next.js to re-fetch Server Components
        }, intervalMs);

        return () => clearInterval(interval);
    }, [router, intervalMs]);

    return null; // This component doesn't render anything
}
