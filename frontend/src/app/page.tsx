"use client";

import { useState } from "react";

// These imports come from the auto-generated Graftcode package.
// After running the backend container, visit http://localhost:81/GV
// to get the install command (e.g., bun add --registry https://grft.dev/<key> @graft/<package>).
//
// import { GraftConfig, HelloService } from "@graft/<your-project-key>";

export default function Home() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [serverTime, setServerTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function callBackend() {
    setLoading(true);
    setError(null);

    try {
      // Uncomment after installing the generated @graft/ package:
      // GraftConfig.host = "ws://localhost/ws";
      // const helloResult = await HelloService.hello("Graftcode");
      // const timeResult = await HelloService.get_time();
      // setGreeting(helloResult);
      // setServerTime(timeResult);

      // Placeholder until the @graft package is installed:
      setGreeting("Connect the backend to see this working!");
      setServerTime(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to call backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center gap-8 px-8 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Graftcode Hello World
        </h1>

        <p className="text-center text-zinc-600 dark:text-zinc-400">
          This Next.js app calls a{" "}
          <span className="font-medium text-black dark:text-white">
            Python backend
          </span>{" "}
          through Graftcode Gateway — no REST API, no HTTP, just direct method
          calls over WebSocket.
        </p>

        <button
          onClick={callBackend}
          disabled={loading}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {loading ? "Calling Python backend..." : "Call HelloService"}
        </button>

        {greeting && (
          <div className="w-full rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                HelloService.hello(&quot;Graftcode&quot;)
              </p>
              <p className="mt-1 text-lg text-black dark:text-white">
                {greeting}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                HelloService.get_time()
              </p>
              <p className="mt-1 text-lg text-black dark:text-white">
                {serverTime}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mt-4 text-center text-sm text-zinc-400">
          <p>
            Frontend: Next.js (TypeScript) &bull; Backend: Python &bull; Bridge:
            Graftcode Gateway
          </p>
        </div>
      </main>
    </div>
  );
}
