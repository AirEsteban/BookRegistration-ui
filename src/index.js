import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Book from './book.js'
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <Book />
  </React.StrictMode>,
  document.getElementById("root")
);