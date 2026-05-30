"use client";

import Script from "next/script";

const JQUERY_SRC =
  "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60a197545c7bb00bdddb264a";

export default function WebflowScripts() {
  return (
    <>
      <Script id="webflow-mod-js" strategy="beforeInteractive">
        {`!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`}
      </Script>
      <Script
        src={JQUERY_SRC}
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <Script src="/js/joe-webb.js" strategy="afterInteractive" />
    </>
  );
}
