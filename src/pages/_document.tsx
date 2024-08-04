import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black selection:bg-emerald-600/50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
