import AlertModal, { showAlert } from "../../components/common/AlertModal";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Row
} from "shards-react";

import LoadError from "../../components/common/LoadError";
import Loading from "../../components/common/Loading";
import PageTitle from "../../components/common/PageTitle";
import React from "react";
import { Store } from "../../flux";
import axios from "axios";
import { getCategoryTheme } from "../../utils/util";

class InOfficeBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      book: {}
    };

    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`/api/officeLibraryBooks/${this.props.match.params.office_book_id}`)
      .then(response => response.json())
      .then(
        data => this.setState({ book: data.data[0], isLoading: false }),
        error => this.setState({ error, isLoading: false })
      );
  }

  handleCheckout(book_id) {
    const checkoutBook = {
      office_book_id: book_id,
      user: Store.user
    };
    axios.patch("/api/officeLibraryBooks/incrementCopiesCheckedOut", checkoutBook)
      .then(
        data => {
          if (!data.data.success) this.showNotifier(`Unable to check out book: ${data.data.error}. You may have to log in again.`);
          else this.componentDidMount();
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
          if (!data.data.success) this.showNotifier(`Unable to check out book: ${data.data.error}. You may have to log in again.`);
          else this.componentDidMount();
        },
        error => this.showNotifier(`Unable to check in book: ${error}`)
      );
  }

  showNotifier = (message) => {
    showAlert({ message });
  }

  render() {
    const { isLoading, error, book } = this.state;

    if (isLoading) return <Loading />;

    if (error) return <LoadError error="Library book failed to load" />;

    return (
      <Container fluid className="main-content-container px-3">
        <Row noGutters className="form-inline py-4">
          <PageTitle sm="8" title={book.title} className="text-sm-left" />
        </Row>
        <Row>
          <Card large id={`book-card`} className="card-book card-post--1">
            <div
              className="card-post__image"
              style={{ backgroundImage: `url('${book.backgroundImage}')` }}
            />
            <Badge pill className={`card-post__category bg-${getCategoryTheme(book.category)}`}>
              {book.category}
            </Badge>
            <CardBody>
              <h5 className="card-title">
                <p className="text-fiord-blue">
                  {book.title}
                </p>
              </h5>
              <p className="card-text text-fiord-blue">{book.body}</p>
            </CardBody>
            <CardFooter className="text-muted border-top py-3">
              <Row>
                <span className="d-inline-block px-3">
                  By{" "}{book.author} | {book.totalCopies - book.copiesCheckedOut}{" "}Available | Checked out by: {JSON.stringify(book.users)}
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
        </Row>
        <AlertModal />
      </Container>
    );
  }
}
export default InOfficeBook;
