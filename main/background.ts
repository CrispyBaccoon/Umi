import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainInvokeEvent,
  Menu,
  MenuItem,
  session,
} from "electron";
import serve from "electron-serve";
import {
  existsSync,
  PathLike,
  readFile,
  readFileSync,
  watchFile,
  writeFile,
  writeFileSync,
} from "fs";
import { createWindow } from "./helpers";
const path = require("path");
const os = require("os");

const isProd: boolean = process.env.NODE_ENV === "production";
let isShown = true;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  let mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    frame: false,
    transparent: true,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    await session.defaultSession.loadExtension(
      path.join(
        os.homedir(),
        "/AppData/Roaming/Opera Software/Opera GX Stable/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.23.0_0"
      )
    );
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    app.quit();
  });

  mainWindow.on("hide", function () {
    isShown = false;
  });

  mainWindow.on("show", function () {
    isShown = true;
  });

  app.on("window-all-closed", () => {
    app.quit();
  });

  /*
  app.inspect = function () {
    mainWindow.toggleDevTools();
  };

  app.toggleFullscreen = function () {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  };

  app.toggleMenubar = function () {
    mainWindow.setMenuBarVisibility(!mainWindow.isMenuBarVisible());
  };

  app.toggleVisible = function () {
    if (process.platform !== "darwin") {
      if (!mainWindow.isMinimized()) {
        mainWindow.minimize();
      } else {
        mainWindow.restore();
      }
    } else {
      if (isShown && !mainWindow.isFullScreen()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    }
  };
  */

  // # Events

  interface EventHandle {
    event: string;
    handle: (event: IpcMainInvokeEvent, ...arg: any[]) => any;
  }

  const respond = (message: string) => {
    console.log("[ipcMain] " + message);
  };

  const eventHandles: EventHandle[] = [
    {
      event: "AppQuit",
      handle: async (event) => {
        app.quit();
      },
    },
    {
      event: "AppMinimize",
      handle: async (event) => {
        mainWindow.minimize();
      },
    },
    {
      event: "AppChangeMaximizeState",
      handle: async (event) => {
        if (mainWindow.isMaximized) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
      },
    },
  ];

  eventHandles.map((eventHandle) => {
    ipcMain.handle(eventHandle.event, eventHandle.handle);
  });

  ipcMain.on("Document/Read", (e, ...args: [PathLike, ...any]) => {
    if (!existsSync(args[0])) {
      writeFileSync(args[0], "");
      respond("Created File: " + args[0]);
    }
    mainWindow.webContents.send(
      "@Document/Read",
      readFileSync(args[0], "utf-8")
    );
    respond("Read File: " + args[0]);
  });

  ipcMain.on("Document/Save", (e, ...args: [PathLike, string, ...any]) => {
    // mainWindow.webContents.send("@Document/Save", readFileSync(args[0]));
    console.log(args);
    writeFileSync(args[0][0], args[0][1]);
    respond("Saved File: " + args[0]);
  });

  //@ts-ignore
  let menu = new Menu();
  //@ts-ignore
  menu.append(
    new MenuItem({
      label: "Save File",
      submenu: [
        {
          label: "",
          accelerator: process.platform == "darwin" ? "Cmd+S" : "Ctrl+S",
          click: () => {
            mainWindow.webContents.send("@Keybinding/Save");
          },
        },
      ],
    })
  );

  //@ts-ignore
  Menu.setApplicationMenu(menu);
})();
