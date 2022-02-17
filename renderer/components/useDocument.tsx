import { ipcRenderer } from "electron";
import { Dispatch, SetStateAction, useState } from "react";

const useDocument = async <T extends Element>(
  documentPath: string
): Promise<[string, Dispatch<SetStateAction<string>>]> => {
  const loadedText: string = await ipcRenderer
    .invoke("Document/Read", documentPath)
    .then((text) => text);

  const [Text, setText] = useState(loadedText);

  return [Text, setText];
};

export default useDocument;
