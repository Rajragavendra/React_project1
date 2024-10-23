import React from 'react';
import './App.css';
import PriavteRoute from './routercomponents/routerIndex';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <PriavteRoute/>
     </BrowserRouter>
    </div>
  );
}

export default App;
