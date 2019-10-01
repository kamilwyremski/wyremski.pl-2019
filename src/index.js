import React from 'react';
import { hydrate, render } from "react-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-46218779-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

window.snapSaveState = () => {
  document.querySelector("#root").setAttribute("data-server-rendered", "true");
};

serviceWorker.unregister();
