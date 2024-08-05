import Head from "next/head";

type CommonHeadProps = {
  children: React.ReactNode;
};

export default function CommonHead(props: CommonHeadProps) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Plannter</title>
      <link rel="icon" type="image/png" href="/plannter-favicon.png" />
      <link
        href="https://fonts.googleapis.com/css2?family=Calistoga&display=swap"
        rel="stylesheet"
      />
      {props.children}
    </Head>
  );
}
