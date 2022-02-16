import React, { useCallback, useState } from "react";
import Head from "next/head";
import Editor from "../components/Editor";
import Preview from "../components/preview";

function App() {
  const [doc, setDoc] = useState<string>("# hello world");

  const handleDocChange = useCallback((newDoc) => setDoc(newDoc), []);
  return (
    <React.Fragment>
      <Head>
        <title>Umi</title>
      </Head>
      <div className="w-full h-full App">
        <Editor onChange={handleDocChange} initialDoc={doc} />
        <Preview doc={doc} />
      </div>
    </React.Fragment>
  );
}

export default App;
