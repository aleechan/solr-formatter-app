import React, { Component } from 'react';
import './App.css';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: '', formattedQuery: '' }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let query = event.target.value;
    let str = query.replace(/\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/gm, ' ');
    let i = 0;
    let depth = 0;
    let result = '';
    while (i < str.length) {

      if (str.charAt(i) === '(') {
        result += str.charAt(i)
        depth++;
        result += '\n';
        result += '\t'.repeat(depth)
      } else if (str.charAt(i) === ')') {
        depth--;
        result += '\n';
        if (depth > 0) result += '\t'.repeat(depth)
        result += str.charAt(i)
        result += '\n';
        if (depth > 0) result += '\t'.repeat(depth)
      } else {
        result += str.charAt(i)
      }
      i++;
    }
    this.setState({ text: query, formattedQuery: result });
  }
  render() {
    return (
      <div >
        Query:
        <br />
        <textarea className="Formatter" value={this.state.text} onChange={this.handleChange} />
        <br />
        Formatted:
        <br />
        <textarea className="Formatter" value={this.state.formattedQuery} />
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
