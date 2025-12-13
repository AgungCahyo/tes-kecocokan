import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata yang Komprehensif
export const metadata: Metadata = {
  metadataBase: new URL('https://personalitytest.id'),
  // Basic Meta
  title: {
    default: "Tes Kecocokan Kepribadian - Analisis Hubungan AI",
    template: "%s | Tes Kecocokan Kepribadian"
  },
  description: "Temukan seberapa cocok kepribadian Anda dan pasangan dengan tes MBTI lengkap. Dapatkan analisis mendalam dari AI tentang komunikasi, nilai, dan strategi membangun hubungan harmonis.",

  // Keywords
  keywords: [
    "tes kecocokan",
    "tes kepribadian",
    "MBTI test",
    "tes pasangan",
    "analisis hubungan",
    "tes kompatibilitas",
    "personality test Indonesia",
    "tes MBTI gratis",
    "analisis AI hubungan",
    "love language test",
    "tes kecocokan online",
    "konseling hubungan AI"
  ],

  // Authors & Creator
  authors: [{ name: "Personality Test AI" }],
  creator: "Personality Test AI Team",
  publisher: "Personality Test AI",

  // Open Graph (Facebook, LinkedIn, dll)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://personalitytest.id",
    siteName: "Tes Kecocokan Kepribadian",
    title: "Tes Kecocokan Kepribadian - Analisis Hubungan dengan AI",
    description: "Tes MBTI lengkap untuk mengukur kecocokan hubungan. Dapatkan analisis mendalam tentang komunikasi, nilai, dan strategi membangun hubungan yang harmonis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tes Kecocokan Kepribadian - Analisis AI"
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Tes Kecocokan Kepribadian - Analisis AI",
    description: "Temukan seberapa cocok kepribadian Anda dengan tes MBTI lengkap dan analisis AI mendalam.",
    images: ["/twitter-image.jpg"],
    creator: "@personalitytest"
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      }
    ]
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Verification (Google Search Console, Bing, dll)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Other Meta Tags
  category: "Psychology & Relationships",
  classification: "Personality Assessment",

  // App-specific
  applicationName: "Tes Kecocokan Kepribadian",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Personality Test"
  },

  // Format Detection
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect ke domain external untuk performa */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#a855f7" />
        <meta name="color-scheme" content="light dark" />

        {/* Geo Tags (jika target lokal Indonesia) */}
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />

        {/* Rating (untuk konten dewasa/semua umur) */}
        <meta name="rating" content="general" />

        {/* Copyright */}
        <meta name="copyright" content="Personality Test AI © 2025" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Tes Kecocokan Kepribadian",
              "url": "https://personalitytest.id",
              "logo": "https://personalitytest.id/logo.png",
              "description": "Platform tes kepribadian dan analisis kecocokan hubungan berbasis AI",
              "sameAs": [
                "https://facebook.com/personalitytest",
                "https://instagram.com/personalitytest",
                "https://twitter.com/personalitytest"
              ]
            })
          }}
        />

        {/* Structured Data - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Tes Kecocokan Kepribadian",
              "url": "https://personalitytest.id",
              "description": "Tes MBTI dan analisis kecocokan hubungan dengan AI",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IDR"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* Structured Data - WebSite (Search Box) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Tes Kecocokan Kepribadian",
              "url": "https://personalitytest.id",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://personalitytest.id/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}