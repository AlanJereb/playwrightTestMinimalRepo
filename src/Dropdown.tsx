import React from "react";

interface Props {
  exposeOpen: (fn: () => void) => () => void;
  children: React.ReactElement;
}

type State = {
  open: boolean;
};

class Dropdown extends React.Component<Props, State> {
  state: State = { open: false };

  componentDidMount() {
    if (this.props.exposeOpen) {
      this.props.exposeOpen(this.openClose);
    }
  }

  openClose = () => {
    const newState = !this.state.open;
    if (newState !== this.state.open) {
      this.setState({
        open: newState
      });
    }
  };

  render() {
    return this.state.open ? (
      <div onClick={this.openClose}>
        {this.props.children}
      </div>
    ) : null;
  }
}

export default Dropdown;
