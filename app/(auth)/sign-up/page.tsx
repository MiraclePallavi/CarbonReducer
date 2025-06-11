
import AuthForm from "@/components/AuthForm";
import React from "react";
import { getloggedInUser } from "@/lib/action/users.action";
export default function SignUpPage() {
  const loggedInUser = getloggedInUser();
  console.log("Logged In User:", loggedInUser);
  return (
    <section className="flex-center w-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
}

