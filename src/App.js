import React, { Component } from 'react';
import formatter from './formatter.js';
import { Grid, TextArea, Header, Form, Radio, Button, Divider, Segment, Menu } from 'semantic-ui-react';

class Formatter extends Component {
  constructor() {
    super();
    this.state = { text: '', formattedQuery: '', minQuery: '', indent: 'tabs',maxLength:30};
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateIndent = this.updateIndent.bind(this);
    this.updateMaxFieldLength = this.updateMaxFieldLength.bind(this);
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
    var result = formatter.parseQuery(str, indent,this.state.maxLength);
    this.setState({ text: query, formattedQuery: result, minQuery: str });
  }

  updateIndent(event, { value }) {
    const state = this.state;
    state.indent = value;
    this.setState(state);
    this.updateQuery(state.text);
  }
  updateMaxFieldLength(event,{value}){
    if(value < 1){
      value = 1;
    }
    const state = this.state;
    state.maxLength = value;
    this.setState(state);
    this.updateQuery(state.text);
  }

  render() {
    return (
      <Grid columns={3} style={{ height: '95vh' }}>
        <Grid.Row style={{ height: "90%" }}>
          <Grid.Column textAlign='center' width={7}>
            <Header size='medium' content='Query:' />
            <TextArea style={{ width: "95%", minHeight: "100%", resize: "none" }} value={this.state.text} onChange={this.handleQueryChange} />
          </Grid.Column>
          <Grid.Column stretched textAlign='center' verticalAlign='middle' width={2} height={100}>
            <Grid.Row>
              <Segment>
                <Form onSubmit={this.updateIndent}>
                  <Form.Field>
                    <Header size='medium' content='Indent Style:' />
                  </Form.Field>
                  <Form.Field>
                    <Radio label='Tabs' name='indentStyle' value='tabs' checked={this.state.indent === 'tabs'} onChange={this.updateIndent} />
                  </Form.Field>
                  <Form.Field>
                    <Radio label='Spaces' name='indentStyle' value='spaces' checked={this.state.indent === 'spaces'} onChange={this.updateIndent} />
                  </Form.Field>
                </Form>
                <Divider />
                <Form>
                  <Header content='Wrap Fields Longer Than:' size='medium'/>
                  <Form.Input type='number' value={this.state.maxLength} onChange={this.updateMaxFieldLength}/>
                </Form>
                <Divider />
                <Button content='Copy' icon='left arrow' onClick={() => { this.updateQuery(this.state.formattedQuery) }} />

              </Segment>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column textAlign='center' width={7}>
            <Header size='medium'>Formatted:</Header>
            <TextArea style={{ width: "95%", minHeight: "85%", resize: "none" }}
              value={this.state.formattedQuery}
            />
            <Header size='medium' content='Compact:' />
            <TextArea style={{ width: "95%", minHeight: "10%", resize: "none" }}
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
        <Menu>
          <Menu.Item header>
            <Header size='huge' content='Solr Query Formatter' />
          </Menu.Item>
        </Menu>

        <Formatter />
      </div>);
  }
}
export default App;
