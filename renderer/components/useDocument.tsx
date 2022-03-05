import electron, { IpcRenderer } from "electron";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useDocument = (
  documentPath: string
): [string, Dispatch<SetStateAction<string>>] => {
  const ipcRenderer: IpcRenderer = electron.ipcRenderer;

  const [document, setDocument] = useState("");

  ipcRenderer?.on("@Document/Read", (e, args) => {
    setDocument(args[0]);
    console.log("[ipcRenderer] Document Read: " + documentPath);
  });

  useEffect(() => {
    ipcRenderer?.send("Document/Read", documentPath);
  }, []);

  return [document, setDocument];
};

export default useDocument;
