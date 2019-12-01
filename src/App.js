import React, { Component } from 'react';
import formatter from './formatter.js';
import { Grid, TextArea, Header, Form, Radio, Button, Divider, Menu, Icon} from 'semantic-ui-react';
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
    this.setState({ text: query, formattedQuery: result});
  }

  compactQuery(query){
    var str = formatter.compactWhiteSpace(formatter.compactWhiteSpace(query));
    this.setState({ text: str, formattedQuery: str});
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
      <Grid columns={2} style={{ height: '95vh' }}>
        <Grid.Row style={{ height: "100%" }}>
          <Grid.Column textAlign='center' width={13}>
              <TextArea style={{ width: "95%", minHeight: "100%", resize: "none", 'fontFamily':"Lucida Console"}} value={this.state.text} onChange={this.handleQueryChange} />
          </Grid.Column>
          <Grid.Column stretched textAlign='left' verticalAlign='middle' width={2}>
            <Grid.Row>
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
              <Button content='Format' onClick={() => { this.updateQuery(this.state.formattedQuery) }}/>
              <Divider/>
              <Button content='Compact' onClick={() => { this.compactQuery(this.state.formattedQuery) }}/>
            </Grid.Row>
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
          <Menu.Item position='right'>
              <a href="https://github.com/aleechan/solr-formatter" style={{color:"black"}}>
                <Icon name='github' size='large'/>
              </a>
          </Menu.Item>
        </Menu>
        <Formatter />
      </div>);
  }
}
export default App;
