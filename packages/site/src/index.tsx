import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from './Root';
import Index from './pages/index';

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <App>
        <Index />
      </App>
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
);
