import {
  Container,
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "shards-react";

import PageTitle from "components/common/PageTitle";
import React from 'react';
import SearchResults from 'components/common/SearchResults';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      bookResults: [],
      articleResults: [],
      tutorialResults: [],
      resourceLinkResults: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInfo(e) {
    axios.get(`/api/books?search=${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          bookResults: data.data
        });
      })
      .then(axios.get(`/api/articles?search=${this.state.query}`)
        .then(({ data }) => {
          this.setState({
            articleResults: data.data
          });
        }))
      .then(axios.get(`api/tutorials?search=${this.state.query}`)
        .then(({ data }) => {
          this.setState({
            tutorialResults: data.data
          });
        }))
      .then(axios.get(`/api/resourceLinks?search=${this.state.query}`)
        .then(({ data }) => {
          this.setState({
            resourceLinkResults: data.data
          });
        }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getInfo();
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 5 === 0) {
          this.getInfo();
        }
      }
    });
  }

  render() {
    let books, tutorials, resourceLinks, articles;
    if (this.state.bookResults.length > 0) { books = <SearchResults searchType='Books' results={this.state.bookResults} />; }
    if (this.state.tutorialResults.length > 0) { tutorials = <SearchResults searchType='Tutorials' results={this.state.tutorialResults} />; }
    if (this.state.resourceLinkResults.length > 0) { resourceLinks = <SearchResults searchType='Resource Links' results={this.state.resourceLinkResults} />; }
    if (this.state.articleResults.length > 0) { articles = <SearchResults searchType='Articles' results={this.state.articleResults} />; }

    return (
      <Container fluid className="main-content-container px-3">
        <Row noGutters className="form-inline py-4">
          <PageTitle sm="8" title="Search Title" className="text-sm-left" />
          <Form className="w-100" onSubmit={this.handleSubmit}>
            <InputGroup>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <i className="material-icons">search</i>
                </InputGroupText>
              </InputGroupAddon>
              <label className="text-muted font-weight-bold" htmlFor="navbar-search" style={{ display: "none" }}>Search</label>
              <FormInput
                id="navbar-search"
                className="navbar-search"
                placeholder="Search for something..."
                onChange={this.handleInputChange}
                onSubmit={this.handleSubmit}
              />
            </InputGroup>
          </Form>
        </Row>
        {books}
        {tutorials}
        {resourceLinks}
        {articles}
      </Container>
    );
  }
}

export default Search;