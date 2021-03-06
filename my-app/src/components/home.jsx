import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";

const Home = () => {
  //hooks
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonCP, setPokemonCP] = useState("");
  const [pokeballs, setPokeballs] = useState("");
  const [pokemonData, setPokemonData] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [pokemonImg, setPokemonImg] = useState("");
  const [pokemonCPInput, setPokemonCPInput] = useState("");
  const [pokeballsInput, setPokeballsInput] = useState("");

  useEffect(() => {
    axios
      .get("https://pokemon-go-bw-backend.herokuapp.com/pokemon")
      .then(response => {
        console.log(response);
        setPokemonData(response.data);
        setPokemonImg(response.data[Math.floor(Math.random() * Math.floor(response.data.length))].ImageURL)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  //event handlers
  const handlePokemonName = event => {
    setPokemonName(event.target.value);
  };
  const handlePokemonCP = event => {
    setPokemonCP(event.target.value);
  };
  const handlePokeballs = event => {
    setPokeballs(event.target.value);
  }
  const handleCalculation = event => {
    event.preventDefault();

    if(pokemonName === '' || pokemonCP === '' || pokeballs === ''){
      return alert("Please enter inputs.");
    }

    let pokemonNameCopy = pokemonName.toLowerCase();
    pokemonNameCopy = pokemonNameCopy[0].toUpperCase() + pokemonNameCopy.slice(1, pokemonNameCopy.length);

    let counter = 0;
    if(pokemonData.forEach(item => { if(item.Name === pokemonNameCopy){ counter++ }}));

    if(counter < 1){
      return alert("That is not a Pokemon.");
    }

    if(isNaN(pokemonCP) === true){
      return alert("Please enter a valid CP value.");
    }

    if(isNaN(pokeballs) === true){
      return alert("Please enter a valid number of Pokeballs.");
    }

    if(pokemonCP < 1){
      return alert("Please enter a positive CP value.");
    }

    if(pokeballs < 0){
      return alert("Nice try. You can't have a negative number of Pokeballs.");
    }

    setPokemonCPInput(pokemonCP);
    setPokeballsInput(pokeballs);

    setPokemonImg(
      pokemonData.filter(item => {
        return item.Name === pokemonNameCopy;
      })[0].ImageURL
    );

    setPokemon(
      pokemonData.filter(item => {
        return item.Name === pokemonNameCopy;
      })[0]
    );

    if(pokemonData.filter(item => {return item.Name === pokemonNameCopy;})[0].MaxCP < pokemonCP){
      alert("The CP value you entered is higher than the max potential CP of the Pokemon you entered.");
    }

    setPokemonName("");
    setPokemonCP("");
    setPokeballs("");
  };

  return (
    <div className="home">
      <Header />
      <h4 className="question">
        Let us know what kind of Pokemon you found, its CP, and the amount of
        Pokeballs you have. We will tell you if it's worth your precious Pokeballs!
      </h4>

      <form onSubmit={event => handleCalculation(event)}>
        <br />
        <label>
          <input
            type="text"
            value={pokemonName}
            placeholder={"Enter Pokemon Name"}
            onChange={event => handlePokemonName(event)}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            value={pokemonCP}
            placeholder={"Enter Pokemon CP"}
            onChange={event => handlePokemonCP(event)}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            value={pokeballs}
            placeholder={"Enter # of Pokeballs"}
            onChange={event => handlePokeballs(event)}
          />
        </label>
        <br />
        <button className="actionButton">Calculate</button>
      </form>

      <div className="output">
        <div className="textOutput">
          <img src={pokemonImg} alt="pokemon" />
          <div className="outputText">
            <div>Your Pokemon's CP: {pokemonCPInput}</div>
            <div>Pokemon's Max CP: {pokemon.MaxCP}</div>
            <div># of Pokeballs: {pokeballsInput}</div>
            <br />
            <div className='result'>Result: {pokemon === '' ? "" : (pokemon.MaxCP * 0.8 <= pokemonCPInput && pokeballsInput >= 5 ? <span className='result-green'>Worthy!</span> : <span className='result-red'>Not Worthy</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
