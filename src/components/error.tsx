'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServerCrash } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="flex justify-center">
                <ServerCrash className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="mt-4 text-2xl">
                Application Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                An unexpected error occurred. This could be a temporary issue.
                Please try reloading the page.
              </p>
              <Button onClick={() => reset()} className="mt-6">
                Try again
              </Button>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
    }
