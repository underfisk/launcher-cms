const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow,
  ipc = electron.ipcMain,
  session = electron.session

// Let electron reloads by itself when webpack watches changes in ./app/
require("electron-reload")(__dirname);

// To avoid being garbage collected

let win;

//temporary control var to be a via env
let production = false;

console.log("Creating a window..");
// Wait until the app is ready
app.once("ready", () => {
  console.log("Window is ready");
  // Create a new window
  win = new BrowserWindow({
    minHeight: 800,
    minWidth: 1200,
    
    // Set the initial width to 800px
    width: 1200,
    // Set the initial height to 600px
    height: 800,
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    fullscreenable: false, //disallow fullscreen mode
    title: "My App ", //app.getName(),
    webPreferences: {
      // Disable node integration in remote page
      nodeIntegration: true
    }
  });

  win.webContents.openDevTools();
  win.loadURL(`file://${__dirname}/app/index.html`);

  /**
   * This one above is just triggered
   * after send a file or a url to load
   * and the show event is just after the ready to show
   */
  win.once("ready-to-show", () => {
    console.log("Im ready");

    /*Checking if he has already a session auth.hasSession(session, result => {
      if (result === "yes") {
        //Lets show the dashboard and load his data
        win.webContents.send("hasSessionNotifier", { login_needed: false });
      } else {
        //Show login
        win.webContents.send("hasSessionNotifier", { login_needed: true });
      }
    });*/

    /*Example of ipc from react ipc.on("authentication", (event, args) => {
      auth
        .Authenticate(args.user, args.pass, "", "", "", -1)
        .then(res => {
          console.log(res);
          switch (res.type) {
            case "captcha_needed":
              console.log("Captcha is needed lets send to client in ipc");
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    });*/


    win.show()
  });

  win.once("show", () => {});

  // Emitted when the window is closed.
  win.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
});


// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
