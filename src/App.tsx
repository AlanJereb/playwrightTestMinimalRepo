import React from "react";
import Dropdown from "./Dropdown";
import "./styles.css";

function App() {
  const contextMenu = (
    <img
      className="image-that-should-render"
      src="https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-random-thin.png"
      alt=""
    />
  );

  let _contextMenuToggler: () => void;
  const setContextMenuToggler = (fn: () => void) =>
    (_contextMenuToggler = fn);

  const rightClick = (e: React.MouseEvent) => {
    if (_contextMenuToggler && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      _contextMenuToggler();
    }
  };

  return (
    <div className="App">
      <div className={"test-div"} onContextMenu={rightClick}>
        <p>Right-click here</p>
        <Dropdown exposeOpen={setContextMenuToggler}>{contextMenu}</Dropdown>
      </div>
    </div>
  );
}

export default App;
