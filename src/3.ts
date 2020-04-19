class EventManager {
  observers: Map<string, Listener[]> = new Map();

  addObserver(event: string, observer: Listener) {
    let listeners = this.observers.get(event);
    if (listeners) listeners.push(observer);
    else this.observers.set(event, [observer]);
  }
  removeObserver(observer: Listener) {
    //...coming soon...
  }
  notifyObservers(event: string, param: string) {
    let listeners = this.observers.get(event);
    if (listeners) {
      listeners.forEach((el) => {
        el.update(param);
      });
    }
  }
}

class Configuration {
  serverUrl: string;
  trayIcon: string;
  events: EventManager;

  constructor() {
    this.serverUrl = "";
    this.trayIcon = "";
    this.events = new EventManager();
  }

  update(newServerUrl: string, newTrayIcon: string) {
    if (this.trayIcon !== newTrayIcon) {
      this.events.notifyObservers("tray", newTrayIcon);
    }
    if (this.serverUrl !== newServerUrl) {
      this.events.notifyObservers("url", newServerUrl);
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

interface Listener {
  update(param?: string): void;
}

class UrlChangeListener implements Listener {
  dataCache: DataCache;
  winRegistry: WinRegisty;
  constructor(winRegistry: WinRegisty, dataCache: DataCache) {
    this.winRegistry = winRegistry;
    this.dataCache = dataCache;
  }
  update(param: string) {
    this.winRegistry.setParam("serverUrl", param);
    this.dataCache.cleanUp();
  }
}

class IconChangeListener implements Listener {
  systemTray: SystemTray;
  winRegistry: WinRegisty;
  constructor(winRegistry: WinRegisty, systemTray: SystemTray) {
    this.systemTray = systemTray;
    this.winRegistry = winRegistry;
  }
  update(param: string) {
    this.systemTray.putIcon(param);
    this.winRegistry.setParam("trayIcon", param);
  }
}

class DataCache {
  getRecord() {}
  cleanUp() {
    console.log(`...cache is clean...`);
  }
}
class WinRegisty {
  serverUrl: string;
  trayIcon: string;

  constructor() {
    this.trayIcon = "";
    this.serverUrl = "";
  }

  getParam() {}

  setParam(param: "trayIcon" | "serverUrl", value: string) {
    this[param] = value;
    console.log(`WinRegisty changed... new ${param}: ${value}`);
  }
}

class SystemTray {
  trayIcon: string;
  constructor() {
    this.trayIcon = "";
  }
  putIcon(icon: string) {
    this.trayIcon = icon;
    console.log(`SystemTray changed... new icon: ${this.trayIcon}`);
  }
}

const reg = new WinRegisty();
const chache = new DataCache();
const tray = new SystemTray();
const url = new UrlChangeListener(reg, chache);
const icon = new IconChangeListener(reg, tray);
const conf = new Configuration();
conf.events.addObserver("tray", icon);
conf.events.addObserver("url", url);
conf.update("new-url.com", "new-img.jpeg");
console.log("..............");
conf.update("new-url.com", "new-img22.jpeg");
