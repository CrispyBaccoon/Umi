import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Head from "next/head";
import Editor from "../components/Editor";
import Preview from "../components/preview";
import useDocument from "../components/useDocument";

function App() {
  let [document, setDocument]:
    | [string, Dispatch<SetStateAction<string>>]
    | ["", () => void] = [null, null];
  useDocument("D:/home/kitchen/documents/document.md").then(
    (useDocumentHook) => {
      [document, setDocument] = useDocumentHook;
    }
  );

  // const [document, setDocument] = useState<string>(document);

  const handleDocChange = useCallback(
    (newDoc) => (setDocument == null ? setDocument(newDoc) : (n) => n),
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
