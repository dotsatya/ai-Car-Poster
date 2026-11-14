"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HowItWorksPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/about#process");
  }, [router]);
  return null;
}

