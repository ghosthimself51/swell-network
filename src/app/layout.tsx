import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swell Network: Liquid Restaking",
  description: "Providing the ultimate liquid restaking experience with Swell Network, making DeFi access easier than ever, and ensuring the secure future of Ethereum.",
  verification: {
    google: '02d49zziVM6Dr2T6YkAwmVqAZvBzw1e6_r1Ya_CTihM',
  },
  viewport: "width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script>
          {`
            window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', 'bfed6e4d374c8cc5182df9485953a5fb608db031', { region: 'eu' });
          `}
        </Script>
      </head>
      <body className={font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
