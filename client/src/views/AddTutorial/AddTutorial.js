/* eslint jsx-a11y/anchor-is-valid: 0 */

import AlertModal, { showAlert } from "components/common/AlertModal";
import {
  Button,
  Container,
  Form,
  FormInput,
  FormTextarea,
  Row
} from "shards-react";

import CategoriesSelection from "components/common/CategoriesSelection";
import LanguagesSelection from "components/common/LanguagesSelection";
import PageTitle from "components/common/PageTitle";
import React from "react";
import axios from "axios";

class AddTutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      backgroundImage: '',
      category: 'General',
      url: '',
      title: '',
      body: '',
      language: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.value });
  }

  handleLanguageChange(e) {
    this.setState({ language: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const tutorial = {
      backgroundImage: this.state.backgroundImage,
      category: this.state.category,
      url: this.state.url,
      title: this.state.title,
      body: this.state.body,
      language: this.state.language
    };

    axios.post("/api/tutorials/", tutorial)
      .then(
        response => {
          if (response.data.success) { this.showNotifier("Tutorial added successfully"); }
          else { this.showNotifier(`Unable to add tutorial: ${JSON.stringify(response.data.error.errors)}`); }
          this.nextPath('/tutorials');
        },
        error => this.showNotifier(`Unable to add tutorial: ${error}`)
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
    const { url, title, backgroundImage, body, category, language } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        <AlertModal />
        <Form id="add-tutorial-form" onSubmit={this.handleSubmit}>
          <Row noGutters className="page-header py-4">
            <PageTitle sm="8" title="Add a Tutorial" className="text-sm-left" />
            <Button id="submit" type="submit" className="btn btn-success btn-lg">
              Submit
            </Button>
          </Row>

          <label className="text-muted font-weight-bold" htmlFor="title">Tutorial Title</label>
          <FormInput id="title" type="text" value={title} onChange={this.handleChange} required />
          <Row form>
            <LanguagesSelection id="language" value={language} onChange={this.handleLanguageChange} />
            <CategoriesSelection id="category" value={category} onChange={this.handleCategoryChange} required />
          </Row>
          <label className="text-muted font-weight-bold" htmlFor="url">Tutorial URL</label>
          <FormInput id="url" type="text" value={url} onChange={this.handleChange} required />
          <label className="text-muted font-weight-bold" htmlFor="backgroundImage">Background Image URL</label>
          <FormInput id="backgroundImage" type="text" value={backgroundImage} onChange={this.handleChange} required />
          <label className="text-muted font-weight-bold" htmlFor="body">Tutorial Description</label>
          <FormTextarea id="body" type="textarea" style={{ height: "150px" }} value={body} onChange={this.handleChange} />
        </Form>
      </Container>
    );
  }
}

export default AddTutorial;
