
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './componenets/app';
import { ErrorHandler } from './componenets/errorHandler';

ReactDOM.render(
  <BrowserRouter>
    <ErrorHandler>
      <App />
    </ErrorHandler>
  </BrowserRouter>,
  document.getElementById('root')
);
