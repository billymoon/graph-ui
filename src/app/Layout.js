import Head from "next/head";
import getConfig from "next/config";
import emotionTheme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";

const { publicRuntimeConfig } = getConfig();

const { dev } = publicRuntimeConfig;

const consoleWarnScript = `
  void (() => {
    const consoleWarn = console.warn
    console.warn = (...args) => {
      if(args[0].startsWith("Warning: componentWillReceiveProps has been renamed")) {
        // do nothing
      } else {
        consoleWarn.call(this, ...args)
      }
    };
  })()
  `;

if (dev) {
  global.publicRuntimeConfig = publicRuntimeConfig;
  global.emotionTheme = emotionTheme;
  global.log = (x) => console.log(x) || x;
}

export const Layout = (props) => {
  return (
    <div
      style={{
        margin: "3rem",
      }}
    >
      <Head>
        <title>Graph UI</title>
        <meta name="description" content="Graph UI" />
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: consoleWarnScript }} />
        {/* <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        /> */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${FONT}&display=swap`}
        /> */}
      </Head>
      <ChakraProvider theme={emotionTheme}>
        <main>{props.children}</main>
      </ChakraProvider>
    </div>
  );
};
