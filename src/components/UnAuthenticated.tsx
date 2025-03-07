"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UnAuthenticated() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Redirect to sign-in page if not signed in
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">You are not signed in</h2>
        <p className="text-gray-600 mb-4">Please sign in to access this page.</p>
        <button
          onClick={() => router.push("/sign-in")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return null; // If signed in, don't show anything
}
