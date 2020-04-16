class EventManager {
  observers: Set<Observer> = new Set();
  addObserver(observer: Observer) {
    this.observers.add(observer);
  }
  removeObserver(observer: Observer) {
    this.observers.delete(observer);
  }
  notifyObservers() {
    this.observers.forEach((el) => {
      el.update();
    });
  }
}

class Configuration extends EventManager {
  serverUrl: string;
  trayIcon: string;

  constructor() {
    super();
    this.serverUrl = "some-server";
    this.trayIcon = "some-icon";
  }

  update(newServerUrl: string, newTrayIcon: string) {
    this.notifyObservers();
    this.serverUrl = newServerUrl;
    this.trayIcon = newTrayIcon;
    // if (this.trayIcon !== newTrayIcon) {
    //   this.tray.putIcon(newTrayIcon);
    // }
    // this.trayIcon = newTrayIcon;
    // if (this.serverUrl !== newServerUrl) {
    //   this.cache.cleanUp();
    // }
    // this.serverUrl = newServerUrl;
    // this.registry.setParam("serverUrl", newServerUrl);
    // this.registry.setParam("trayIcon", newTrayIcon);
  }

  getServerUrl() {
    return this.serverUrl;
  }

  getTrayIcon() {
    return this.trayIcon;
  }
}

interface Observer {
  update(): void;
}

class DataCache implements Observer {
  getRecord() {}
  cleanUp() {
    console.log(`...cache is clean...`);
  }
  update() {
    this.cleanUp();
  }
}
class WinRegisty implements Observer {
  serverUrl: string;
  trayIcon: string;

  constructor() {
    this.trayIcon = "";
    this.serverUrl = "";
  }
  getParam() {}
  setParam(param: "trayIcon" | "serverUrl", value: string) {
    this[param] = value;
  }
  update() {
    // this.setParam("serverUrl", newServerUrl);
    // this.setParam("trayIcon", newTrayIcon);
  }
}
class SystemTray implements Observer {
  trayIcon: string;
  constructor() {
    this.trayIcon = "";
  }
  putIcon(icon: string) {
    this.trayIcon = icon;
  }
  update() {
    //this.putIcon(newTrayIcon);
  }
}

const conf = new Configuration();
const tray = new SystemTray();
conf.addObserver(tray);
conf.update("new-url.com", "new-img.jpeg");
console.log(tray);
conf.update("new-url.com", "new-img22.jpeg");
console.log(tray);
