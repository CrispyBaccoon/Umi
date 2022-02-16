import React from "react";
import type { AppProps } from "next/app";

import "../components/shim";

import "../styles/globals.css";
import TabBar from "../components/TabBar";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full">
      <TabBar />
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
    </div>
  );
}

export default App;
