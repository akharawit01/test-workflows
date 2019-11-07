import React, { Component, Suspense } from "react";
import PublicRouter from "./router";

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <Suspense fallback={<>Loading...</>}>
        <PublicRouter history={history} />
      </Suspense>
    );
  }
}

export default App;
