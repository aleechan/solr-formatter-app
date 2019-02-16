import React, { Component } from 'react';
import './App.css';
import formatter from './formatter.js';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: '', formattedQuery: '' };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    var query = event.target.value;
    //compress spaces not in quotes
    var str = formatter.compactWhiteSpace(query);
    var result = formatter.parseQuery(str);
    this.setState({ text: query, formattedQuery: result });
  }
  render() {
    return (
      <div>
        Query:
        <br />
        <textarea className="Formatter" value={this.state.text} onChange={this.handleChange} />
        <br />
        Formatted:
        <br />
        <textarea className="Formatter" readOnly value={this.state.formattedQuery} />
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Solr Query Formatter</h1>
        </header>
        <Formatter />
      </div>);
  }
}

export default App;
