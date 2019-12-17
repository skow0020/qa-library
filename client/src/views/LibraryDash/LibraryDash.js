import AlertModal, { showAlert } from "components/common/AlertModal";
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
import { Link } from "react-router-dom";
import LoadError from "components/common/LoadError";
import Loading from "components/common/Loading";
import PageTitle from "components/common/PageTitle";
import React from "react";
import { Store } from "../../flux";
import axios from "axios";
import { getCategoryTheme } from "utils/util";
import queryString from 'query-string';

class LibraryDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      avatarUrl: null,
      isLoggedIn: false,
      books: [],
      isLoading: false
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
  }

  componentDidMount() {
    if (this.props.hasOwnProperty('location') && this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      if (values.user) {
        Store.user = values.user;
        Store.avatarUrl = values.avatar_url;
        this.setState({
          user: values.user,
          avatarUrl: values.avatar_url,
          isLoggedIn: true
        });
        this.getBookList();
      }
    } else if (Store.user) {
      this.setState({
        user: Store.user,
        avatarUrl: Store.avatarUrl,
        isLoggedIn: true
      });
      this.getBookList();
    }
  }

  getBookList() {
    const categoryFilter = this.state.category ? `category=${this.state.category}` : '';
    const filter = categoryFilter;

    this.setState({ isLoading: true });
    fetch(`/api/officeLibraryBooks?${filter}`)
      .then(response => response.json())
      .then(
        data => this.setState({ books: data.data, isLoading: false }),
        error => this.setState({ error, isLoading: false })
      );
  }

  handleFilterChange(e) {
    this.setState({
      category: e.target.value
    }, () => this.getBookList());
  }

  handleCheckout(book_id) {
    const checkoutBook = {
      office_book_id: book_id,
      user: Store.user
    };
    axios.patch("/api/officeLibraryBooks/incrementCopiesCheckedOut", checkoutBook)
      .then(
        data => {
          if (!data.data.success) this.showNotifier(`Unable to check out book: ${data.data.error}`);
          else this.getBookList();
        },
        error => this.showNotifier(`Unable to checkout book: ${error}`)
      );
  }

  handleCheckIn(book_id) {
    const checkinBook = {
      office_book_id: book_id,
      user: Store.user
    };
    axios.patch("/api/officeLibraryBooks/decrementCopiesCheckedOut", checkinBook)
      .then(
        data => {
          if (!data.data.success) this.showNotifier(`Unable to check in book: ${data.data.error}`);
          else this.getBookList();
        },
        error => this.showNotifier(`Unable to checkin book: ${error}`)
      );
  }

  showNotifier = (message) => {
    showAlert({ message });
  }

  render() {
    const { category, isLoggedIn, isLoading, error, books } = this.state;

    if (isLoading) return <Loading />;

    if (error) return <LoadError error="Library books failed to load" />;

    let login;
    if (!isLoggedIn) {
      login = <a href="/login" aria-label="Login to Github">
        <Button id="login-button" type="button" className="btn btn-success btn-lg">Log In with Github</Button>
      </a>;
    } else login = (
      <div>
        <div>
          <span className="d-none d-md-inline-block px-3">{this.state.user}</span>
          <img className="user-avatar rounded-circle mr-2" src={this.state.avatarUrl} alt="User Avatar" width="70" />
        </div>
      </div>
    );

    let categoryDD;
    if (isLoggedIn) {
      categoryDD = (
        <FormGroup id='filtering-form'>
          <CategoriesSelection id="category" value={category} onChange={this.handleFilterChange} />
        </FormGroup>
      );
    }

    return (
      <Container fluid className="main-content-container px-3">
        <AlertModal />
        <Row noGutters className="form-inline py-4">
          <PageTitle sm="8" title="In-Office Library" className="text-sm-left" />
          {login}
          {categoryDD}
        </Row>
        <Row>
          {books.map((book, idx) => (
            <Col lg="4" md="6" sm="12" className="mb-4" key={idx}>
              <Card small id={`book-card-${idx}`} className="card-book card-post--1">
                <Link id={`book-${book.office_book_id}`} to={`/officeBook/${book.office_book_id}`}>
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url('${book.backgroundImage}')` }}
                  />
                </Link>
                <Badge pill className={`card-post__category bg-${getCategoryTheme(book.category)}`}>
                  {book.category}
                </Badge>
                <Link id={`book-body-${book.office_book_id}`} to={`/officeBook/${book.office_book_id}`}>
                  <CardBody>
                    <h5 className="card-title">
                      <p className="text-fiord-blue">
                        {book.title}
                      </p>
                    </h5>
                  </CardBody>
                </Link>
                <CardFooter className="text-muted border-top py-3">
                  <Row>
                    <span className="d-inline-block px-3">
                      By{" "}{book.author} | {book.totalCopies - book.copiesCheckedOut}{" "}Available
                    </span>
                  </Row>
                  <div>
                    <Button type="button" className={`checkout-${book.office_book_id} btn btn-success`} onClick={() => this.handleCheckout(book.office_book_id)}>
                      Check out
                    </Button>
                    <span className="d-inline-block px-3">
                      {" "}
                    </span>
                    <Button type="button" className={`checkin-${book.office_book_id} btn btn-success pull-right`} onClick={() => this.handleCheckIn(book.office_book_id)}>
                      Check in
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
export default LibraryDash;
