import {
  Container,
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import React from 'react';
import SearchResults from '../components/common/SearchResults';
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
      <Container>
        <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" onSubmit={this.handleSubmit}>
          <InputGroup seamless className="ml-3">
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
        {books}
        {tutorials}
        {resourceLinks}
        {articles}
      </Container>
    );
  }
}

export default Search;