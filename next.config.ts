import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/2026-oscars-leaderboard",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
