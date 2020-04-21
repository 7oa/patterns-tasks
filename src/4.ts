class TestSession {
  state!: State;
  constructor(state: State) {
    this.setState(state);
  }
  setState(state: State) {
    this.state = state;
    this.state.setContext(this);
  }
  getCurrentQuestionForm() {
    return this.state.getCurrentQuestionForm();
  }
  getCurrentSubtest() {
    return this.state.getCurrentSubtest();
  }
  setAnswers() {
    return this.state.setAnswers();
  }
  setSubtestResults() {
    return this.state.setSubtestResults();
  }
}

class State {
  context!: TestSession;

  setContext(context: TestSession) {
    this.context = context;
  }
  getCurrentQuestionForm() {}
  getCurrentSubtest() {}
  setAnswers() {}
  setSubtestResults() {}
}

class InstructionState extends State {
  getCurrentQuestionForm() {}
  getCurrentSubtest() {}
  setAnswers() {}
  setSubtestResults() {}
}
class FormInfoState extends State {
  getCurrentQuestionForm() {
    //return this.context.currentForm.getInfo();
  }
  getCurrentSubtest() {
    throw new Error(`You cannot show test in questionnaire phase`);
  }
  setAnswers() {
    // storeAnswers(ans);
    // this.context.currentForm = getNextForm();
    // if (this.currentForm == null) this.context.setState(new SubtestInfoState());
  }
  setSubtestResults() {
    // storeResults(res);
    // this.context.currentSubtest = getNextSubtest();
    // if (this.currentSubtest == null) this.context.setState(new FinishedState());
  }
}
class SubtestInfoState extends State {
  getCurrentQuestionForm() {
    throw new Error(`You cannot show form in subtest phase`);
  }
  getCurrentSubtest() {
    //return this.context.currentSubtest.getInfo();
  }
  setAnswers() {
    throw new Error(`You cannot save answers in subtest phase`);
  }
  setSubtestResults() {
    throw new Error(`You cannot save answers in subtest phase`);
  }
}
class FinishedState extends State {
  getCurrentQuestionForm() {
    throw new Error(`Test session is finished`);
  }
  getCurrentSubtest() {
    throw new Error(`Test session is finished`);
  }
  setAnswers() {
    throw new Error(`Test session is finished`);
  }
  setSubtestResults() {
    throw new Error(`Test session is finished`);
  }
}

const initialState = new InstructionState();
const context = new TestSession(initialState);
context.getCurrentQuestionForm();
