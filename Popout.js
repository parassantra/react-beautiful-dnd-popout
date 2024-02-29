import React from "react";
import { create } from "jss";
import { jssPreset, StylesProvider } from "@material-ui/styles";
import PopoutWindow from "react-popout";

export default class Popout extends React.Component {
  state = {
    ready: false
  };

  handleRef = ref => {
    const ownerDocument = ref ? ref.ownerDocument : null;
    ownerDocument &&
      this.setState({
        ready: true,
        jss: create({
          ...jssPreset(),
          insertionPoint: ownerDocument.querySelector("#demo-frame-jss")
        }),
        sheetsManager: new Map()
      });
  };

  render() {
    const children = <React.Fragment>{this.props.children}</React.Fragment>;
    const childrenWithProps = React.cloneElement(children, {
      container: this.ownerdocument
    });

    return (
      <PopoutWindow>
        <div id="demo-frame-jss" ref={this.handleRef} />
        {this.state.ready ? (
          <StylesProvider
            jss={this.state.jss}
            sheetsManager={this.state.sheetsManager}
          >
            {childrenWithProps}
          </StylesProvider>
        ) : null}
      </PopoutWindow>
    );
  }
}
