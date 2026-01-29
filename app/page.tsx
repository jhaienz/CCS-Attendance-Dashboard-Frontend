"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to lgoin
    router.push("/login");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  );
}
