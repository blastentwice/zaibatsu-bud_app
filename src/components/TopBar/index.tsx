import * as React from "react";
import {
  faHome,
  faTimes,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ipcRenderer } from "electron";
import Menu from "./Menu";
import { useHistory, useLocation } from "react-router";

const onMinimize = () => {
  return ipcRenderer.send("minimize");
};
const onMaximize = () => {
  return ipcRenderer.send("maximize");
};
const onClose = () => {
  return ipcRenderer.send("close");
};

export default function TopBar() {
  const location = useLocation();
  const { push } = useHistory();
  return (
    <div className="topbar">
      <Menu
        menu={[
          {
            disabled: location.pathname === "/",
            title: <FontAwesomeIcon icon={faHome} color="white" />,
            onClick: (event) => {
              event.preventDefault();
              push("/");
            },
          },
        ]}
      />
      <div className="topbar-brand">
        <h3>Zaibatsu Bud</h3>
      </div>
      <div className="topbar-icons">
        <button className="topbar-icons__single" onClick={onMinimize}>
          <FontAwesomeIcon icon={faWindowMinimize} color="white" />
        </button>
        <button className="topbar-icons__single" onClick={onMaximize}>
          <FontAwesomeIcon icon={faWindowMaximize} color="white" />
        </button>
        <button className="topbar-icons__single" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} color="white" />
        </button>
      </div>
    </div>
  );
}
