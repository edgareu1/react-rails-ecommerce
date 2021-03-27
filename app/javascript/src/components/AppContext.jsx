import React, { Component } from "react";

const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AppContext.Provider value={{}}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppProvider, AppConsumer };
