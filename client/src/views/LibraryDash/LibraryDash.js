/* eslint-disable react-hooks/exhaustive-deps */

import AlertModal, { showAlert } from "components/common/AlertModal";
import React, { useEffect, useState } from "react";

import Button from '@material-ui/core/Button';
import CardComponent from "components/common/CardComponent";
import CategoriesSelection from "components/common/CategoriesSelection";
import Chip from '@material-ui/core/Chip';
import Colors from 'utils/Colors';
import Divider from '@material-ui/core/Divider';
import GithubAvatar from 'components/common/GithubAvatar';
import Grid from '@material-ui/core/Grid';
import LoadError from "components/common/LoadError";
import Loading from "components/common/Loading";
import PageTitle from "components/common/PageTitle";
import { Store } from "../../flux";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { getCategoryTheme } from "utils/util";
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: Colors.primary,
    color: Colors.white
  },
  cardSpacing: {
    margin: theme.spacing(1)
  }
}));

export default function LibraryDash(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    if (Store.user && Store.avatarUrl) {
      setUser(Store.user);
      setAvatarUrl(Store.avatarUrl);

      return getBookList();
    }
    else if (props.location.search) {
      const values = queryString.parse(props.location.search);
      if (values.user) {
        Store.user = values.user;
        Store.avatarUrl = values.avatar_url;
        setAvatarUrl(values.avatar_url);
        setUser(values.user);

        return getBookList();
      }
      setBooks([]);
    }
  };

  const getBookList = () => {
    const categoryFilter = category ? `category=${category}` : '';

    setIsLoading(true);
    fetch(`/api/officeLibraryBooks?${categoryFilter}`)
      .then(response => response.json())
      .then(
        data => {
          setBooks(data.data);
          setIsLoading(false);
        },
        error => {
          setError(error);
          setIsLoading(false);
        }
      );
  };

  useEffect(() => { getBooks(); }, [category]);

  const handleCheckout = (book_id) => {
    const checkoutBook = {
      office_book_id: book_id,
      user: Store.user
    };
    axios.patch("/api/officeLibraryBooks/incrementCopiesCheckedOut", checkoutBook)
      .then(
        data => {
          if (!data.data.success) showAlert({ message: `Unable to check out book: ${data.data.error}` });
          else getBookList();
        },
        error => showAlert({ message: `Unable to checkout book: ${error}` })
      );
  };

  const handleCheckIn = (book_id) => {
    const checkinBook = {
      office_book_id: book_id,
      user: Store.user
    };
    axios.patch("/api/officeLibraryBooks/decrementCopiesCheckedOut", checkinBook)
      .then(
        data => {
          if (!data.data.success) showAlert({ message: `Unable to check in book: ${data.data.error}` });
          else getBookList();
        },
        error => showAlert({ message: `Unable to check in book: ${error}` })
      );
  };

  if (isLoading) return <Loading />;
  if (error) return <LoadError error="Library books failed to load" />;

  return (
    <Grid container>
      <AlertModal />
      <Grid container alignItems="center" justify="space-between">
        <PageTitle title="In-Office Library" />
        {!user && (
          <a href="/login" aria-label="Login to Github">
            <Button id="login-button" variant="contained" className={classes.button}>Log In with Github</Button>
          </a>
        )}
        {user && (
          <Grid alignItems="center" justify="space-between">
            <GithubAvatar avatarUrl={avatarUrl} />
            <CategoriesSelection id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={4}>
        {books.map((book, idx) => (
          <Grid item md={4} key={idx}>
            <CardComponent
              idx={`article-card-${idx}`}
              url={`/officeBook/${book.office_book_id}`}
              title={book.title}
              subheader={`By ${book.author}`}
              avatar={<Chip
                size="small"
                label={book.category}
                style={{ backgroundColor: book.category ? getCategoryTheme(book.category) : Colors.blue }}
              />}
              backgroundImage={book.backgroundImage}
              body={book.body}
            >
              <Divider className={classes.cardSpacing} />
              <Grid>
                <Typography variant="body2" component="p">
                  By{" "}{book.author} | {book.totalCopies - book.copiesCheckedOut}{" "}Available
                </Typography>
              </Grid>
              <Divider className={classes.cardSpacing} />
              <Grid container justify="space-between">
                <Button variant="contained" className={`checkout-${book.office_book_id} ${classes.button}`} onClick={() => handleCheckout(book.office_book_id)}>
                  Check out
                </Button>
                <Button variant="contained" className={`checkin-${book.office_book_id} ${classes.button}`} onClick={() => handleCheckIn(book.office_book_id)}>
                  Check in
                </Button>
              </Grid>
            </CardComponent>
          </Grid>
        ))}
      </Grid>
    </Grid >
  );
}
