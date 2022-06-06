import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);

serviceWorkerRegistration.register();

window.snapSaveState = () => {
  document.querySelector("#app").setAttribute("data-server-rendered", "true");
};


