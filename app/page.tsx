// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">Welcome to Carbon Tracker 🌿</h1>
      <p className="mb-6">Track your footprint—and cool down the planet.</p>
      <div className="space-x-4">
        <Link
          href="/sign-in"
          className="btn-cool px-4 py-2 rounded backdrop-blur bg-white/20"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="btn-cool px-4 py-2 rounded backdrop-blur bg-white/20"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
