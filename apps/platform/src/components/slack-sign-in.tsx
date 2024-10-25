"use client";

import { createClient } from "@v1/db/client";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { isDesktopApp } from "@todesktop/client-core/platform/todesktop";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function SlackSignIn() {
  const [isLoading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignIn = async () => {
    setLoading(true);

    if (isDesktopApp()) {
      const redirectTo = new URL("/api/auth/callback", window.location.origin);

      redirectTo.searchParams.append("provider", "slack");
      redirectTo.searchParams.append("client", "desktop");

      await supabase.auth.signInWithOAuth({
        provider: "slack",
        options: {
          redirectTo: redirectTo.toString(),
          queryParams: {
            client: "desktop",
          },
        },
      });
    } else {
      await supabase.auth.signInWithOAuth({
        provider: "slack",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?provider=slack`,
        },
      });
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      className="active:scale-[0.98] bg-backgroud px-6 py-4 text-secondary font-medium flex space-x-2 h-[40px] w-full"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={0.5} />
      ) : (
        <>
          <Icons.Slack strokeWidth={0.5} />
          <span>Continue with Slack</span>
        </>
      )}
    </Button>
  );
}
