import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site-config";
import { bizmealsStructuredData } from "@/lib/structured-data";
import AppShell from "@/components/bizmeals/app-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | BizMeals`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: "BizMeals" }],
  creator: "BizMeals",
  publisher: "BizMeals",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: "website",
    url: siteConfig.seo.url,
    siteName: "BizMeals",
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 512,
        height: 512,
        alt: "BizMeals — Business Growth Execution Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteConfig.seo.url,
  },
  category: "business",
};

export const viewport = {
  themeColor: "#0F2557",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured data (JSON-LD) — server-rendered so search engines and
            AI answer engines receive entity, service and FAQ data in the
            initial HTML. See src/lib/structured-data.ts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bizmealsStructuredData),
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
