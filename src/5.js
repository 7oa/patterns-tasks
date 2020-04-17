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
class ReportView {
    drawTabularData(data) { }
}
class TableReport extends ReportView {
    drawTabularData(data) {
        return `Table ${data}`;
    }
}
class GraphReport extends ReportView {
    drawTabularData(data) {
        return `Graph ${data}`;
    }
}
class DiagramReport extends ReportView {
    drawTabularData(data) {
        return `Diagram ${data}`;
    }
}
const a = new A(new GraphReport());
const b = new B(new TableReport());
const c = new C(new GraphReport());
const d = new D(new DiagramReport());
console.log(a.generate());
console.log(b.generate());
console.log(c.generate());
console.log(d.generate());
