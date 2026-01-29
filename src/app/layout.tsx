import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { FacebookPixel } from "@/lib/pixel";

import { Suspense } from "react";
import Clarity from "@/components/Clarity";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculadora de Reforma Aveiro | Estimativa Rápida",
  description: "Descubra quanto custa a sua remodelação em Aveiro com a nossa calculadora interativa gratuita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        {/* Head content managed below via next/script */}
      </head>
      <body className={`${inter.className} bg-[#FCFCFA]`} suppressHydrationWarning>
        <Suspense fallback={null}>
          <FacebookPixel />
          <Clarity />
        </Suspense>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '920621233729145');
              fbq('track', 'PageView', { value: 1, currency: 'EUR' });
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=920621233729145&ev=PageView&cd[value]=1&cd[currency]=EUR&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
