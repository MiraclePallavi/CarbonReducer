
import AuthForm from "@/components/AuthForm";
import React from "react";

export default function SignInPage() {
  return (
    <section className="flex-center w-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
}

