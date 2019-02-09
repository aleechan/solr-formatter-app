import React, { Component } from 'react';
import './App.css';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: '', formattedQuery: '' }

    this.handleChange = this.handleChange.bind(this);
    this.parseQuery = this.parseQuery.bind(this);
    this.nextLine = this.nextLine.bind(this);
  }
  handleChange(event) {
    let query = event.target.value;
    let str = query.replace(/\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/gm, ' ');
    var result = this.parseQuery(str);
    this.setState({ text: query, formattedQuery: result });
  }
  parseQuery(str){
    let i = 0;
    let depth = 0;
    let result = '';
    let part = '';
    while (i < str.length) {
      if (str.charAt(i) === '(') {
        console.log(part)
        result += part.trim();
        if(!part.match(/[+-]/gm)){
          result += this.nextLine(depth);
        }
        part = '';
        result += str.charAt(i)
        depth++
        result += this.nextLine(depth);
      } else if (str.charAt(i) === ')') {
        result += part;
        part = '';
        depth--;
        result += this.nextLine(depth);
        result += str.charAt(i)
        result += this.nextLine(depth);
      } else {
        part += str.charAt(i)
      }
      i++;
    }
    return result;
  }
  nextLine(depth){
    let str = '\n'
    if (depth > 0) str += '\t'.repeat(depth)
    return str;
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
