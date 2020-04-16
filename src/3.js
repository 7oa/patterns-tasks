"use strict";
//Базовый издатель
class EventManager {
    constructor() {
        this.observers = new Set();
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.delete(observer);
    }
    notifyObservers() {
        this.observers.forEach((el) => {
            el.update();
        });
    }
}
//Конкретный издатель, изменение которого хотят отслеживать наблюдатели
class Configuration extends EventManager {
    constructor() {
        super();
        this.serverUrl = "some-server";
        this.trayIcon = "some-icon";
    }
    update(newServerUrl, newTrayIcon) {
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
    }
    update() {
        // this.setParam("serverUrl", newServerUrl);
        // this.setParam("trayIcon", newTrayIcon);
    }
}
class SystemTray {
    constructor() {
        this.trayIcon = "";
    }
    putIcon(icon) {
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
