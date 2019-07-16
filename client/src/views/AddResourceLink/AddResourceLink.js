/* eslint jsx-a11y/anchor-is-valid: 0 */

import AlertModal, { showAlert } from "../../components/common/AlertModal";
import {
  Button,
  Container,
  Form,
  FormInput,
  FormTextarea,
  Row
} from "shards-react";

import CategoriesSelection from "../../components/common/CategoriesSelection";
import LanguagesSelection from "../../components/common/LanguagesSelection";
import PageTitle from "../../components/common/PageTitle";
import React from "react";
import axios from "axios";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: '',
      category: 'General',
      url: '',
      title: '',
      body: '',
      language: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const resourceLink = {
      backgroundImage: this.state.backgroundImage,
      category: this.state.category,
      url: this.state.url,
      title: this.state.title,
      body: this.state.body,
      language: this.state.language
    };

    axios.post("/api/resourceLinks/", resourceLink)
      .then(
        response => {
          if (response.data.success) { this.showNotifier("ResourceLink added successfully"); }
          else { this.showNotifier(`Unable to add resource link: ${JSON.stringify(response.data.error.errors)}`); }
          this.nextPath('/resource-links');
        },
        error => this.showNotifier(`Unable to add resource link: ${error}`)
      );
  }

  nextPath(path) {
    setTimeout(function () {
      this.props.history.push(path);
    }.bind(this), 2000);
  }

  showNotifier = (message) => {
    showAlert({ message });
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <AlertModal />
        <Form id="add-book-form" onSubmit={this.handleSubmit}>
          <Row noGutters className="page-header py-4">
            <PageTitle sm="8" title="Add a Resource Link" className="text-sm-left" />
            <Button id="submit" type="submit" className="btn btn-success btn-lg">
              Submit
            </Button>
          </Row>

          <label className="text-muted font-weight-bold" htmlFor="title">Resource Title</label>
          <FormInput id="title" type="text" value={this.state.title} onChange={this.handleChange} required />
          <Row form>
            <LanguagesSelection value={this.state.language} onChange={this.handleChange}/>
            <CategoriesSelection value={this.state.category} onChange={this.handleChange} required />
          </Row>
          <label className="text-muted font-weight-bold" htmlFor="url">Resource URL</label>
          <FormInput id="url" type="text" value={this.state.url} onChange={this.handleChange} required />
          <label className="text-muted font-weight-bold" htmlFor="backgroundImage">Background Image URL</label>
          <FormInput id="backgroundImage" type="text" value={this.state.backgroundImage} onChange={this.handleChange} required />
          <label className="text-muted font-weight-bold" htmlFor="body">Resource Description</label>
          <FormTextarea id="body" type="textarea" style={{ height: "150px" }} value={this.state.body} onChange={this.handleChange} />
        </Form>
      </Container>
    );
  }
}

export default AddBook;
