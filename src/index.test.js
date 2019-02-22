// @flow

import ReactDOM from 'react-dom';
// routes
import { setupRoutes } from './routes';

it('renders without crashing', () => {
  const routes = setupRoutes();
  const rootElement: HTMLDivElement = document.createElement('div');

  ReactDOM.render(routes, rootElement);
  ReactDOM.unmountComponentAtNode(rootElement);
});
