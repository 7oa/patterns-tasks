"use strict";
class Report {
    generate() { }
}
class TabularReport extends Report {
    constructor(view) {
        super();
        this.view = view;
    }
    generate() {
        const data = this.loadTabularData();
        return this.drawTabularData(data);
    }
    loadTabularData() {
        return ["..."];
    }
    drawTabularData(data) {
        return this.view.drawTabularData(data);
    }
}
class A extends TabularReport {
    loadTabularData() {
        return ["a1", "a2"];
    }
}
class B extends TabularReport {
    loadTabularData() {
        return ["b1", "b2"];
    }
}
class C extends TabularReport {
    loadTabularData() {
        return ["c1", "c2"];
    }
}
class D extends TabularReport {
    loadTabularData() {
        return ["d1", "d2"];
    }
}
class TableReportStrategy {
    drawTabularData(data) {
        return `Table ${data}`;
    }
}
class GraphReportStrategy {
    drawTabularData(data) {
        return `Graph ${data}`;
    }
}
class DiagramReportStrategy {
    drawTabularData(data) {
        return `Diagram ${data}`;
    }
}
const a = new A(new GraphReportStrategy());
const b = new B(new TableReportStrategy());
const c = new C(new GraphReportStrategy());
const d = new D(new DiagramReportStrategy());
console.log(a.generate());
console.log(b.generate());
console.log(c.generate());
console.log(d.generate());
