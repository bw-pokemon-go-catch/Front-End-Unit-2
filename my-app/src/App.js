import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './components/login';

function App() {

  useEffect( () => {
    axios.get('https://pokemon-go-bw-backend.herokuapp.com/pokemon')
      .then( response => {
        console.log(response)
      })
      .catch( error => {
        console.log(error)
      });
  }, []);

  return (
    <div className="App">
      Gotta catch 'em all!
      <LoginPage />
    </div>
  );
}

export default App;
