'use client';

import { useEffect } from 'react';
// import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h2 className="mb-4 text-4xl font-bold">Something went wrong!</h2>
            <button
              onClick={() => reset()}
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {/* Try again (global-error) */}
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
