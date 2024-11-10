import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MovieContextProvider from './components/Context'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </BrowserRouter>
);
