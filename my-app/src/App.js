import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import AppRouter from './components/AppRouter';

function App() {

  //hooks
  const [pokemonName, setPokemonName] = useState();

  useEffect( () => {
    axios.get('https://pokemon-go-bw-backend.herokuapp.com/pokemon')
      .then( response => {
        console.log(response)
        console.log(response.data[0]['Max HP'])
        setPokemonName(response.data[0]['Name'])
      })
      .catch( error => {
        console.log(error)
      });
  }, []);

  //event handlers
  const handleCalculation = event => {

  }

  return (
    <div className="App">
      Should I try to catch this Pokemon?
      <br />
      <form onSubmit={event => handleCalculation(event)}>
      </form>
      <br />
      <SignupPage />
      <LoginPage />
      <AppRouter />
    </div>
  );
}

export default App;
