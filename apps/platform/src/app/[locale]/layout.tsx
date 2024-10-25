import "@/styles/globals.css";
import { Provider as Analytics } from "@v1/events/client";
import { cn } from "@v1/ui/cn";
import "@v1/ui/globals.css";
import { IntercomScript } from "@v1/ui/intercom-script";
import IntercomWidget from "@v1/ui/intercom-widget";
import { Toaster } from "@v1/ui/toaster";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://solomon-ai.app"),
  title: "Solomon AI | A better way to act on your finances",
  description:
    "We extract unknown relationships from your finances and help you act on them.",
  twitter: {
    title: "Solomon AI | A better way to act on your finances",
    description:
      "We extract unknown relationships from your finances and help you act on them.",
    images: [
      {
        url: "https://cdn.solomon-ai.ai/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.solomon-ai.ai/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  openGraph: {
    title: "Solomon AI | A better way to act on your finances",
    description:
      "We extract unknown relationships from your finances and help you act on them.",
    url: "https://solomon-ai.app",
    siteName: "Solomon AI",
    images: [
      {
        url: "https://cdn.solomon-ai.ai/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.solomon-ai.ai/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export const preferredRegion = ["fra1", "sfo1", "iad1"];
export const maxDuration = 60;

export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "whitespace-pre-line overscroll-none scrollbar-hide",
        )}
      >
        <Providers locale={locale}>{children}</Providers>

        <IntercomWidget
          appId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID ?? "pezs7zbq"}
        />
        <IntercomScript
          appId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID ?? "pezs7zbq"}
        />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
