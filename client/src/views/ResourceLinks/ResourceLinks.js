/* eslint jsx-a11y/anchor-is-valid: 0 */

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Row
} from "shards-react";

import CategoriesSelection from "../../components/common/CategoriesSelection";
import LanguagesSelection from "../../components/common/LanguagesSelection";
import LoadError from "../../components/common/LoadError";
import Loading from "../../components/common/Loading";
import PageTitle from "../../components/common/PageTitle";
import React from "react";
import { getCategoryTheme } from "../../utils/util";

class ResourceLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceLinks: [],
      isLoading: false,
      filter: null
    };

    this.getResourceLinks = this.getResourceLinks.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  componentDidMount() {
    this.getResourceLinks();
  }

  getResourceLinks() {
    const categoryFilter = this.state.category ? `category=${this.state.category}` : '';
    const languageFilter = this.state.language ? `language=${this.state.language}` : '';
    const filter = `${categoryFilter}&${languageFilter}`;

    this.setState({ isLoading: true });
    fetch(`/api/resourceLinks?${filter}`)
      .then(response => response.json())
      .then(
        data => this.setState({ resourceLinks: data.data, isLoading: false }),
        error => this.setState({ error, isLoading: false })
      );
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  handleFilterChange(e) {
    this.setState({
      category: e.target.value
    }, () => this.getResourceLinks());
  }

  handleLanguageChange(e) {
    this.setState({
      language: e.target.value
    }, () => this.getResourceLinks());
  }

  render() {
    const { resourceLinks, isLoading, error, category, language } = this.state;

    if (isLoading) return <Loading />;

    if (error) return <LoadError error="Resource Links failed to load" />;

    return (
      <Container fluid className="main-content-container px-3">
        <Row noGutters className="form-inline py-2">
          <PageTitle sm="8" title="Resource Links" className="text-sm-left" />
          <Button id="add-resourceLink" type="button" className="btn btn-success btn-lg" onClick={() => this.nextPath('/add-resourceLink')}>
            Add Resource Link
          </Button>
        </Row>
        <Row noGutters className="form-inline py-2">
          <Form id='filtering-form'>
            <FormGroup >
              <CategoriesSelection value={category} onChange={this.handleFilterChange} />
              <LanguagesSelection value={language} onChange={this.handleLanguageChange} />
            </FormGroup>
          </Form>
        </Row>
        <Row>
          {resourceLinks.map((post, idx) => (
            <Col lg="4" md="6" sm="12" className="mb-4" key={idx}>
              <Card small id={`resource-card-${idx}`} className="card-post card-post--1">
                <a href={post.url}>
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url('${post.backgroundImage}')` }}
                  />
                </a>
                <Badge pill className={`card-post__category bg-${getCategoryTheme(post.category)}`}>
                  {post.category}
                </Badge>
                <CardBody>
                  <h5 className="card-title">
                    <a href={post.url} className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.body}</p>
                  <span className="text-muted">{post.date}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ResourceLinks;
