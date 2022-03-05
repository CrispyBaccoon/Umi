import electron, { IpcRenderer } from "electron";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface Document {
  doc: string;
  didUpdate: boolean;
}

const useDocument = (
  documentPath: string
): [Document, Dispatch<SetStateAction<Document>>] => {
  const ipcRenderer: IpcRenderer = electron.ipcRenderer;

  const [document, setDocument]: [Document, any] = useState({
    doc: "",
    didUpdate: false,
  });

  ipcRenderer?.on("@Document/Read", (e, args) => {
    console.table(args);
    setDocument({ doc: args, didUpdate: true });
    console.log("[ipcRenderer] Document Read: " + documentPath);
    console.log(document.doc);
  });

  useEffect(() => {
    ipcRenderer?.send("Document/Read", documentPath);
  }, []);

  return [document, setDocument];
};

export default useDocument;
