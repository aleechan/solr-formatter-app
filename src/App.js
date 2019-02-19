import React, { Component } from 'react';
import formatter from './formatter.js';
import { Grid, TextArea, Header, Form, Radio } from 'semantic-ui-react';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: '', formattedQuery: '', minQuery: '', indent: 'tabs' };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }
  handleQueryChange(event) {
    this.updateQuery(event.target.value);
  }
  updateQuery(query) {
    var str = formatter.compactWhiteSpace(query);
    var indent = '\t';
    if (this.state.indent === 'spaces') {
      indent = '    ';
    }
    var result = formatter.parseQuery(str, indent);
    this.setState({ text: query, formattedQuery: result, minQuery: str });
  }

  updateSettings(event, { value }) {
    console.log(value);
    let state = this.state;
    state.indent = value;
    this.setState(state);
    this.updateQuery(state.text);
  }
  render() {
    return (
      <Grid columns={2} divided style={{ height: '95vh' }}>
        <Grid.Row style={{ height: "90%" }}>
          <Grid.Column textAlign='center'>
            <Header size='medium'>Query:</Header>
            <TextArea style={{ width: "95%", minHeight: "85%", resize: "none" }}
              value={this.state.text}
              onChange={this.handleQueryChange}
            />
            <Form onSubmit={this.updateSettings}>
              <Form.Field>
                <Header size='medium'>Indent Style:</Header>
              </Form.Field>
              <Form.Field>
                <Radio
                  label='Tabs'
                  name='indentStyle'
                  value='tabs'
                  checked={this.state.indent === 'tabs'}
                  onChange={this.updateSettings}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label='Spaces'
                  name='indentStyle'
                  value='spaces'
                  checked={this.state.indent === 'spaces'}
                  onChange={this.updateSettings}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header size='medium'>Formatted:</Header>
            <TextArea style={{ width: "95%", minHeight: "85%", resize: "none" }}
              value={this.state.formattedQuery}
            />
            <Header size='medium'>Compact:</Header>
            <TextArea style={{ width: "95%", minHeight: "5%", resize: "none" }}
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
