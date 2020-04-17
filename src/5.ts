class Report {
  generate() {}
}
class TabularReport extends Report {
  view: ViewStrategy;
  constructor(view: ViewStrategy) {
    super();
    this.view = view;
  }
  setView(view: ViewStrategy) {
    this.view = view;
  }
  generate() {
    const data = this.loadTabularData();
    return this.drawTabularData(data);
  }
  loadTabularData() {
    return ["..."];
  }
  drawTabularData(data: string[]) {
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

interface ViewStrategy {
  drawTabularData(data: string[]): void;
}
class TableReportStrategy implements ViewStrategy {
  drawTabularData(data: string[]) {
    return `Table ${data}`;
  }
}
class GraphReportStrategy implements ViewStrategy {
  drawTabularData(data: string[]) {
    return `Graph ${data}`;
  }
}
class DiagramReportStrategy implements ViewStrategy {
  drawTabularData(data: string[]) {
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
