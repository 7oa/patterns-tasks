"use strict";
class EventManager {
    constructor() {
        this.observers = new Map();
        this.eventsType = [];
    }
    setTypes(events) {
        events.forEach((el) => {
            this.eventsType.push(el);
            this.observers.set(el, []);
        });
    }
    addObserver(event, observer) {
        let listeners = this.observers.get(event);
        if (listeners)
            listeners.push(observer);
    }
    removeObserver(observer) {
        //...coming soon...
    }
    notifyObservers(event, param) {
        let listeners = this.observers.get(event);
        if (listeners) {
            listeners.forEach((el) => {
                el.update(param);
            });
        }
    }
}
class Configuration extends EventManager {
    constructor() {
        super();
        this.serverUrl = "some-server";
        this.trayIcon = "some-icon";
        this.setTypes(["url", "tray"]);
    }
    update(newServerUrl, newTrayIcon) {
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
class DataCache {
    getRecord() { }
    cleanUp() {
        console.log(`...cache is clean...`);
    }
    update() {
        this.cleanUp();
    }
}
class WinRegisty {
    constructor() {
        this.trayIcon = "";
        this.serverUrl = "";
    }
    getParam() { }
    setParam(param, value) {
        this[param] = value;
        console.log(`WinRegisty changed...`);
    }
    update(params) {
        if (params.serverUrl)
            this.setParam("serverUrl", params.serverUrl);
        if (params.trayIcon)
            this.setParam("trayIcon", params.trayIcon);
    }
}
class SystemTray {
    constructor() {
        this.trayIcon = "";
    }
    putIcon(icon) {
        this.trayIcon = icon;
        console.log(`SystemTray changed... new icon ${this.trayIcon}`);
    }
    update(params) {
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
