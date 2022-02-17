import { ipcRenderer } from "electron";
import { useState } from "react";

const useDocument = async <T extends Element>(
  documentPath: string
): Promise<[string, (string) => void]> => {
  const loadedText = await ipcRenderer
    .invoke("Document/Read")
    .then((text) => text);

  const [Text, setText] = useState(loadedText);

  return [Text, setText];
};

export default useDocument;
