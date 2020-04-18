class Report {
  generate() {}
}
class TabularReport extends Report {
  view: ViewStrategy;
  perfomance: PerfomanceStrategy;
  constructor(perfomance: PerfomanceStrategy, view: ViewStrategy) {
    super();
    this.view = view;
    this.perfomance = perfomance;
  }
  setView(view: ViewStrategy) {
    this.view = view;
  }
  setPerfomance(perfomance: PerfomanceStrategy) {
    this.perfomance = perfomance;
  }
  generate() {
    const data = this.perfomance.loadTabularData();
    return this.view.drawTabularData(data);
  }
}

interface PerfomanceStrategy {
  loadTabularData(): string[];
}
class A implements PerfomanceStrategy {
  loadTabularData() {
    return ["a1", "a2"];
  }
}
class B implements PerfomanceStrategy {
  loadTabularData() {
    return ["b1", "b2"];
  }
}
class C implements PerfomanceStrategy {
  loadTabularData() {
    return ["c1", "c2"];
  }
}
class D implements PerfomanceStrategy {
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
