import React from "react";

interface Props {
  exposeOpen: (fn: () => void) => () => void;
  children: React.ReactElement[];
}

type State = {
  open: boolean;
};

const isFullString = (e: any): e is string => typeof e === "string" && e.trim().length > 0; // stupid type guard for TS

class Dropdown extends React.Component<Props, State> {
  state: State = { open: false };
  _ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener("mousedown", this.bodyClick, true);
    document.addEventListener("mouseup", this.bodyClick, true);
    document.addEventListener("focusin", this.bodyClick, true);
    document.addEventListener("contextmenu", this.bodyClick, true);
    if (this.props.exposeOpen) {
      this.props.exposeOpen(this.openClose);
    }
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.bodyClick, true);
    document.removeEventListener("mouseup", this.bodyClick, true);
    document.removeEventListener("focusin", this.bodyClick, true);
    document.removeEventListener("contextmenu", this.bodyClick, true);
    if (this.props.exposeOpen) {
      this.props.exposeOpen(() => {});
    }
  }

  eventWasOutside(
    e?: React.MouseEvent | MouseEvent | FocusEvent,
    exclusions?: Array<string | React.RefObject<HTMLElement>>,
  ): boolean {
    if (!e) {
      return false;
    }
    const nodeTarget = e.target as Node;
    if (!nodeTarget?.isConnected) {
      return false;
    }
    exclusions = [...(exclusions || []), ".resizerule", ".ui-block"];
    const isWithin = (el: Element | undefined | null): boolean =>
      Boolean(el && (el.contains(nodeTarget) || el === nodeTarget))
    ;
    const stringExclusions = exclusions.filter(isFullString);
    for (const exclusion of exclusions || []) {
      if (!exclusion || typeof exclusion === "string") {
        continue;
      }
      if (isWithin(exclusion?.current)) {
        return false;
      }
    }
    if (stringExclusions.length) {
      const matches = document.querySelectorAll(stringExclusions.join(","));
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < matches.length; i++) {
        if (isWithin(matches[i])) {
          return false;
        }
      }
    }
    return true;
  }

  mouseDownWasOutside: boolean | undefined;
  bodyClick = (e: MouseEvent | FocusEvent) => {
    if (
      !this.state.open ||
      !this.eventWasOutside(e, [this._ref]) ||
      this.mouseDownWasOutside === false
    ) {
      if (e.type === "mousedown") {
        this.mouseDownWasOutside = this.eventWasOutside(e, [this._ref]);
      }
      return;
    }
    if (e.type === "mousedown") {
      return;
    }
    this.openClose(false);
  }

  openClose = (open?: boolean) => {
    const newState = !this.state.open;
    if (newState !== this.state.open) {
      this.setState({
        open: newState
      });
    }
  };

  render() {
    return this.state.open ? (
      <div onClick={() => this.openClose()} ref={this._ref} style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        maxWidth: 300,
      }}>
        {this.props.children}
      </div>
    ) : null;
  }
}

export default Dropdown;
