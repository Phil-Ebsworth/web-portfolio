'use client';

import { LoginForm } from "@/app/ui/login/login-form"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/main/start");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null; // Redirect or show a message if already authenticated
  } else {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    )
  }
}