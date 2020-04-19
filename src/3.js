"use strict";
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    addListener(event, listener) {
        let listeners = this.listeners.get(event);
        if (listeners)
            listeners.push(listener);
        else
            this.listeners.set(event, [listener]);
    }
    removeListener(listener) {
        //...coming soon...
    }
    notifyListeners(event, param) {
        let listeners = this.listeners.get(event);
        if (listeners) {
            listeners.forEach((el) => {
                el.update(param);
            });
        }
    }
}
class Configuration {
    constructor() {
        this.serverUrl = "";
        this.trayIcon = "";
        this.events = new EventManager();
    }
    update(newServerUrl, newTrayIcon) {
        if (this.trayIcon !== newTrayIcon) {
            this.events.notifyListeners("tray", newTrayIcon);
        }
        if (this.serverUrl !== newServerUrl) {
            this.events.notifyListeners("url", newServerUrl);
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
class UrlChangeListener {
    constructor(winRegistry, dataCache) {
        this.winRegistry = winRegistry;
        this.dataCache = dataCache;
    }
    update(param) {
        this.winRegistry.setParam("serverUrl", param);
        this.dataCache.cleanUp();
    }
}
class IconChangeListener {
    constructor(winRegistry, systemTray) {
        this.systemTray = systemTray;
        this.winRegistry = winRegistry;
    }
    update(param) {
        this.systemTray.putIcon(param);
        this.winRegistry.setParam("trayIcon", param);
    }
}
class DataCache {
    getRecord() { }
    cleanUp() {
        console.log(`...cache is clean...`);
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
        console.log(`WinRegisty changed... new ${param}: ${value}`);
    }
}
class SystemTray {
    constructor() {
        this.trayIcon = "";
    }
    putIcon(icon) {
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
conf.events.addListener("tray", icon);
conf.events.addListener("url", url);
conf.update("new-url.com", "new-img.jpeg");
console.log("..............");
conf.update("new-url.com", "new-img22.jpeg");
