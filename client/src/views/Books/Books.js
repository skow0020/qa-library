/* eslint jsx-a11y/anchor-is-valid: 0 */

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  FormGroup,
  Row
} from "shards-react";

import CategoriesSelection from "components/common/CategoriesSelection";
import LanguagesSelection from "components/common/LanguagesSelection";
import LoadError from "components/common/LoadError";
import Loading from "components/common/Loading";
import PageTitle from "components/common/PageTitle";
import React from "react";
import { getCategoryTheme } from "../../utils/util";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: false,
      filter: null,
      category: '',
      language: ''
    };

    this.getBooks = this.getBooks.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    const categoryFilter = this.state.category ? `category=${this.state.category}` : '';
    const languageFilter = this.state.language ? `language=${this.state.language}` : '';
    const filter = `${categoryFilter}&${languageFilter}`;

    this.setState({ isLoading: true });
    fetch(`/api/books?${filter}`)
      .then(response => response.json())
      .then(
        data => this.setState({ books: data.data, isLoading: false }),
        error => this.setState({ error, isLoading: false })
      );
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  handleFilterChange(e) {
    this.setState({
      category: e.target.value
    }, () => this.getBooks());
  }

  handleLanguageChange(e) {
    this.setState({
      language: e.target.value
    }, () => this.getBooks());
  }

  pdfCheck(pdfURL) {
    if (pdfURL) return <a className="text-fiord-blue" href={pdfURL} target="_blank" rel="noopener noreferrer">PDF Version</a>;
  }

  render() {
    const { books, isLoading, error, category, language } = this.state;

    if (isLoading) return <Loading />;

    if (error) return <LoadError error="Books Failed to load" />;

    return (
      <Container fluid className="main-content-container px-3">
        <Row noGutters className="form-inline py-2">
          <PageTitle sm="8" title="Books" className="text-sm-left" />
          <Button id="add-book" type="button" className="btn btn-success btn-lg" onClick={() => this.nextPath('/add-book')}>
            Add Book
          </Button>
        </Row>
        <Row noGutters className="form-inline py-2">
          <FormGroup id='filtering-form'>
            <CategoriesSelection id="category" value={category} onChange={this.handleFilterChange} />
            <LanguagesSelection id="language" value={language} onChange={this.handleLanguageChange} />
          </FormGroup>
        </Row>

        <Row>
          {books.map((post, idx) => (
            <Col lg="4" md="6" sm="12" className="mb-4" key={idx}>
              <Card small id={`book-card-${idx}`} className="card-post card-post--1">
                <a href={post.url} target="_blank" rel="noopener noreferrer" aria-label="Navigate to the book url">
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
                    <a className="text-fiord-blue" href={post.url} target="_blank" rel="noopener noreferrer" aria-label="Navigate to the book url">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text">{post.body}</p>
                  {this.pdfCheck(post.pdf)}
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <span className="d-inline-block">
                    By{" "}
                    <a className="text-fiord-blue">
                      {post.author}
                    </a>
                  </span>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Books;
