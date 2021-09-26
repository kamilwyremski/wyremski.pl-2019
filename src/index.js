import React from 'react';
import { hydrate, render } from "react-dom";
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

serviceWorkerRegistration.register();

window.snapSaveState = () => {
  document.querySelector("#root").setAttribute("data-server-rendered", "true");
};


