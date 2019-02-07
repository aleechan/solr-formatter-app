import React, { Component } from 'react';
import './App.css';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: 'Test', formattedQuery: '' }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let query = event.target.value;
    let str = query.replace(/[\n\r\t]/gm, '');
    let i = 0;
    let depth = 0;
    let result = '';
    while (i < str.length){
     
      if(str.charAt(i) === '('){
        result =result.concat(str.charAt(i))
        depth++;
        result = result.concat("\n")
        for(var j  =0; j < depth; j++){
          result = result.concat("\t")
        }
      }else if (str.charAt(i) === ')'){
        depth--;
        result = result.concat("\n")
        for(var j  =0; j < depth; j++){
          result = result.concat("\t")
        }
        result =result.concat(str.charAt(i))
        result = result.concat("\n")
        for(var j  =0; j < depth; j++){
          result = result.concat("\t")
        }
      }else{
        result =result.concat(str.charAt(i))
      }
      i++;
    }
    
    this.setState({ text: query, formattedQuery: result});
  }
  render() {
    return (
      <div>
        <textarea value={this.state.text} onChange={this.handleChange} />
        <br />
        <textarea value={this.state.formattedQuery} />
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
