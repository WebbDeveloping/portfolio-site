import type { Metadata } from "next";
import WebflowScripts from "@/components/webflow/WebflowScripts";
import { dmSans, oswald } from "@/lib/fonts";
import "./globals.css";
import "@/styles/webflow/normalize.css";
import "@/styles/webflow/components.css";
import "@/styles/webflow/joe-webb.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joewebbdesigns.com"),
  title: {
    default: "Joe Webb Designs | Professional Web Design & Development",
    template: "%s | Joe Webb Designs",
  },
  description:
    "I am Joe Webb, a website developer and online entrepreneur. I have designed and developed dozens of websites to help generate thousands of leads for companies across the United States.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-wf-site="60a197545c7bb00bdddb264a"
      className={`${oswald.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
        <WebflowScripts />
      </body>
    </html>
  );
}
