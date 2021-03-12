import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      pokemon: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleClick(text)  {
    const data= await fetch(`https://api.pokemontcg.io/v1/cards?name=${text}`)
    const poke = await data.json()
    this.setState({
      pokemon: poke.cards
    })
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    })
  }

  render() {
    const { text, pokemon } = this.state
    return (
      <div className="main">
        <header className="App-header">
          <h1>Pokemon</h1>
        <nav>
          <label htmlFor="input">
            <input onChange={ (e) => this.handleChange(e) }name="input" type="text"/>
            <button onClick={() => this.handleClick(text)} type="button">Search</button>
          </label>
        </nav> 
        </header> 
        <main className="App-cards">
          {pokemon.map((item) => (
            <div className="card">
              <h3 className="card-title" key={item.id}>{item.name}</h3>
              <img src={item.imageUrl} alt={item.name}/>
              <p className="card-type" key={item.number}>{item.types}</p>
            </div>
              ))}
        </main>      
      </div>
    );
  }
}

export default App