import React, { Component } from 'react';
import formatter from './formatter.js';
import { Grid, TextArea, Header } from 'semantic-ui-react';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: '', formattedQuery: '', minQuery:''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    var query = event.target.value;
    //compress spaces not in quotes
    var str = formatter.compactWhiteSpace(query);
    var result = formatter.parseQuery(str);
    this.setState({ text: query, formattedQuery: result ,minQuery:str});
  }

  render() {
    return (
      <Grid columns={2} divided style={{height: '95vh'}}>
        <Grid.Row style={{height: "90%" }}>
          <Grid.Column textAlign='center'>
            <Header size='medium'>Query:</Header>
            <TextArea style={{ width: "95%", minHeight: "95%" }} 
                      value={this.state.text} 
                      onChange={this.handleChange} 
                      />
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header size='medium'>Formatted:</Header>
            <TextArea style={{ width: "95%", minHeight: "85%"  }}
                      value={this.state.formattedQuery} 
                      />
            <Header size='medium'>Compact:</Header>
            <TextArea style={{ width: "95%", minHeight: "5%"  }}
                      value={this.state.minQuery} 
                      />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Header size='huge' dividing>
          Solr Query Formatter
        </Header>
        <Formatter />
      </div>);
  }
}
export default App;
