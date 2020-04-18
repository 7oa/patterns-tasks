"use strict";
class Report {
    generate() { }
}
class TabularReport extends Report {
    constructor(perfomance, view) {
        super();
        this.view = view;
        this.perfomance = perfomance;
    }
    setView(view) {
        this.view = view;
    }
    setPerfomance(perfomance) {
        this.perfomance = perfomance;
    }
    generate() {
        const data = this.perfomance.loadTabularData();
        return this.view.drawTabularData(data);
    }
}
class A {
    loadTabularData() {
        return ["a1", "a2"];
    }
}
class B {
    loadTabularData() {
        return ["b1", "b2"];
    }
}
class C {
    loadTabularData() {
        return ["c1", "c2"];
    }
}
class D {
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
const a = new TabularReport(new A(), new GraphReportStrategy());
const b = new TabularReport(new B(), new TableReportStrategy());
const c = new TabularReport(new C(), new GraphReportStrategy());
const d = new TabularReport(new D(), new DiagramReportStrategy());
console.log(a.generate());
console.log(b.generate());
console.log(c.generate());
console.log(d.generate());
d.setPerfomance(new A());
console.log(d.generate());
d.setView(new GraphReportStrategy());
console.log(d.generate());
