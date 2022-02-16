import electron from "electron";

// interface WindowControlsProps {}
interface WindowControlProps {
  f: () => void;
  color: string;
  id: string;
}

export default function WindowControls() {
  const ipcRenderer = electron.ipcRenderer;

  return (
    <div className="h-10 p-3.5 m-0 flex gap-3.5">
      <WindowControl
        id="window-control-close"
        f={() => {
          ipcRenderer.invoke("AppQuit");
        }}
        color={"#fe564c"}
      />
      <WindowControl
        id="window-control-minimize"
        f={() => {
          ipcRenderer.invoke("AppMinimize");
        }}
        color={"#fcb428"}
      />
      <WindowControl
        id="window-control-maximize"
        f={() => {
          ipcRenderer.invoke("AppChangeMaximizeState");
        }}
        color={"#21c136"}
      />
    </div>
  );
}

function WindowControl(props: WindowControlProps) {
  return (
    <button
      id={props.id}
      className="w-3.5 h-3.5 rounded-full z-50 no-drag"
      onClick={props.f}
      style={{ backgroundColor: props.color }}
    />
  );
}
