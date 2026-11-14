"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppAuth } from "@/lib/auth";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, openSignIn } = useAppAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
      openSignIn();
    }
  }, [isLoaded, isSignedIn, router, openSignIn]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <>{children}</>;
}
