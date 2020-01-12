import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list-component'
import { SearchBox } from "./components/search-box/search-box-component";

class App extends Component {
    constructor() {
        super();

        this.state = {
            monsters: [],
            searchField: ''
        };

        // bind the "this" in "handleChange" to the "this" defined in the constructor
        // or, use an arrow function in handleChange, which automatically sets "this" within that function to the original "this" where arrow function was defined -> in that case, don't need to do .bind
        //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({monsters: users}));
    }

    handleChange = (e) => {
        this.setState({searchField: e.target.value});
    }

    render() {
        const { monsters, searchField } = this.state;
        const filteredMonsters = monsters.filter(monster =>
            monster.name.toLowerCase().includes(searchField.toLowerCase())
        );
        return (
            <div className="App">
                <h1> Monsters Rolodex </h1>
                <SearchBox placeholder='Search Monsters' handleChange={this.handleChange}/>
                <CardList monsters={filteredMonsters}/>
            </div>
        );
    }
}

export default App;