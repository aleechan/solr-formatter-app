import React, { Component } from 'react';
import './App.css';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: '', formattedQuery: '' };

    this.handleChange = this.handleChange.bind(this);
    this.parseQuery = this.parseQuery.bind(this);
    this.nextLine = this.nextLine.bind(this);
  }
  handleChange(event) {
    var query = event.target.value;
    //compress spaces not in quotes
    var str = query.replace(/\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/gm, ' ');
    //remove extra spaces between (
    str = str.replace(/(?<=\()\s*(?=\()/gm, '');
    //remove extra spaces between )
    str = str.replace(/(?<=\))\s*(?=\))/gm, '');
    var result = this.parseQuery(str);
    this.setState({ text: query, formattedQuery: result });
  }
  parseQuery(str) {
    var i = 0;
    var depth = 0;
    var result = '';
    var part = '';
    while (i < str.length) {
      if (str.charAt(i) === '(') {
        part = part.trim();
        //if the last character was '(' ignoring whitespace
        if (result.match(/\([\s]*$/gm) && part.length > 0) {
          result += this.nextLine(depth);
        }
        result += part.trim();
        //if part does not contain + or - or :
        if (!part.match(/[+-:]/gm)) {
          result += this.nextLine(depth);
        }
        depth++;
        part = '';
        result += str.charAt(i);

      } else if (str.charAt(i) === ')') {
        //if the last character printed was ) start a new line indented 1 less than the current depth
        if (result.charAt(result.length - 1) === ')') {
          result += this.nextLine(depth - 1);
        }
        result += part.trim();
        depth--;
        result += str.charAt(i);
        part = '';
        //If this the end of one query block add a new line
        if(depth === 0){
          result += '\n';
        }
      } else {
        part += str.charAt(i);
      }
      i++;
    }
    return result;
  }
  nextLine(depth){
    var str = '\n';
    if (depth > 0) str += '\t'.repeat(depth);
    return str;
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
