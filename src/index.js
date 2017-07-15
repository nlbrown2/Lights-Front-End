import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';

render(<App />, document.getElementById('root'));
unregister();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(
      <NextApp />,
      document.getElementById('root')
    )
  })
}
