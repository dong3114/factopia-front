import React from 'react';
import { RouterProvider } from 'react-router-dom';
import RouterComponent from './router/Router'
import './index.css';

function App() {
  return <RouterProvider router={RouterComponent}/>
}

export default App;
