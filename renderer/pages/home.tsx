import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Head from "next/head";
import Editor from "../components/Editor";
import Preview from "../components/preview";
import { ipcRenderer } from "electron";

const useDocument = async <T extends Element>(
  documentPath: string
): Promise<[string, Dispatch<SetStateAction<string>>]> => {
  const loadedText: string = await ipcRenderer
    .invoke("Document/Read", documentPath)
    .then((text) => text);

  const [Text, setText] = useState(loadedText);

  return [Text, setText];
};

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
