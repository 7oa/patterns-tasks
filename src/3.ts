class EventManager {
  observers: Map<string, Observer[]> = new Map();
  eventsType: string[];

  constructor() {
    this.eventsType = [];
  }

  setTypes(events: string[]) {
    events.forEach((el) => {
      this.eventsType.push(el);
      this.observers.set(el, []);
    });
  }

  addObserver(event: string, observer: Observer) {
    let listeners = this.observers.get(event);
    if (listeners) listeners.push(observer);
  }
  removeObserver(observer: Observer) {
    //...coming soon...
  }
  notifyObservers(event: string, param: object) {
    let listeners = this.observers.get(event);
    if (listeners) {
      listeners.forEach((el) => {
        el.update(param);
      });
    }
  }
}

class Configuration extends EventManager {
  serverUrl: string;
  trayIcon: string;

  constructor() {
    super();
    this.serverUrl = "some-server";
    this.trayIcon = "some-icon";
    this.setTypes(["url", "tray"]);
  }

  update(newServerUrl: string, newTrayIcon: string) {
    if (this.trayIcon !== newTrayIcon) {
      this.notifyObservers("tray", { trayIcon: newTrayIcon });
    }
    if (this.serverUrl !== newServerUrl) {
      this.notifyObservers("url", { serverUrl: newServerUrl });
    }
    this.trayIcon = newTrayIcon;
    this.serverUrl = newServerUrl;
  }

  getServerUrl() {
    return this.serverUrl;
  }

  getTrayIcon() {
    return this.trayIcon;
  }
}

interface Observer {
  update(params?: object): void;
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
    console.log(`WinRegisty changed...`);
  }
  update(params: any) {
    if (params.serverUrl) this.setParam("serverUrl", params.serverUrl);
    if (params.trayIcon) this.setParam("trayIcon", params.trayIcon);
  }
}
class SystemTray implements Observer {
  trayIcon: string;
  constructor() {
    this.trayIcon = "";
  }
  putIcon(icon: string) {
    this.trayIcon = icon;
    console.log(`SystemTray changed... new icon ${this.trayIcon}`);
  }
  update(params: any) {
    this.putIcon(params.trayIcon);
  }
}

const conf = new Configuration();
const tray = new SystemTray();
const reg = new WinRegisty();
const cache = new DataCache();
conf.addObserver("tray", tray);
conf.addObserver("url", cache);
conf.addObserver("tray", reg);
conf.addObserver("url", reg);
conf.update("new-url.com", "new-img.jpeg");
conf.update("new-url.com", "new-img22.jpeg");
