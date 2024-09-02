import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300 text-left selection:bg-emerald-500/40 pb-28 md:pb-0 font-LexendDeca">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
