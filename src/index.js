// @flow

import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// routes
import { setupRoutes } from './routes';

const routes = setupRoutes();
const rootElement: HTMLDivElement = document.getElementById('root');

ReactDOM.render(routes, rootElement);

// http://bit.ly/CRA-PWA
serviceWorker.unregister();
