import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Head from "next/head";
import Editor from "../components/Editor";
import Preview from "../components/preview";
import { ipcRenderer } from "electron";
import useDocument from "../components/useDocument";

function App() {
  const [document, setDocument] = useDocument(
    "D:/home/kitchen/documents/document.md"
  );

  const handleDocChange = useCallback(
    (newDoc) => setDocument(newDoc),
    [setDocument]
  );
  return (
    <React.Fragment>
      <Head>
        <title>Umi</title>
      </Head>
      <div className="w-full h-full App">
        <Editor onChange={handleDocChange} initialDoc={document} />
        <Preview doc={document} />
      </div>
    </React.Fragment>
  );
}

export default App;
