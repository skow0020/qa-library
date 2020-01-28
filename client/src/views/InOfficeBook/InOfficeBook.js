/* eslint-disable react-hooks/exhaustive-deps */

import AlertModal, { showAlert } from "components/common/AlertModal";
import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Colors from 'utils/Colors';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LoadError from "components/common/LoadError";
import Loading from "components/common/Loading";
import { Store } from "../../flux";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { getCategoryTheme } from "utils/util";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  checkInButton: {
    backgroundColor: Colors.primary,
    color: Colors.white
  },
  checkOutButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginLeft: "auto",
    margin: theme.spacing(0, 4)
  },
  checkOutButtons: {
    margin: theme.spacing(2, 2)
  }
}));

export default function InOfficeBook(props) {
  const classes = useStyles();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getBook() {
    setIsLoading(true);
    const { office_book_id } = props.match.params;
    await fetch(`/api/officeLibraryBooks/${office_book_id}`)
      .then(response => response.json())
      .then(
        data => {
          console.log(data.data[0])
          if (data.error) setError(data.error);
          else setBook(data.data[0]);
          console.log("BOOOOK: ", book)
          setIsLoading(false);
        },
        error => {
          setError(error);
          setIsLoading(false);
        }
      );
  };

  useEffect(() => {
    getBook();
  }, [props.match.params.office_book_id]);

  const handleCheckout = (book_id) => {
    const checkoutBook = {
      office_book_id: book_id,
      user: Store.user
    };
    axios.patch("/api/officeLibraryBooks/incrementCopiesCheckedOut", checkoutBook)
      .then(
        data => {
          if (!data.data.success) showAlert({ message: `Unable to check out book: ${data.data.error}. You may have to log in again.` });
          else getBook();
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
          if (!data.data.success) showAlert({ message: `Unable to check out book: ${data.data.error}` });
          else getBook();
        },
        error => showAlert({ message: `Unable to check in book: ${error}` })
      );
  };

  const getUsers = () => {
    return book.users ? book.users.join(', ') : "No one";
  };

  if (isLoading) return <Loading />;

  if (error) return <LoadError error="Unable to find library book" />;

  return (
    <Container className="card-post">
      <AlertModal />
      <Grid>
        <Card>
          <CardHeader
            titleTypographyProps={{ variant: 'h6' }}
            title={book.title}
            avatar={
              <Chip
                label={book.category}
                style={{ backgroundColor: getCategoryTheme(book.category) }} />
            }
          />
          <CardMedia
            className="card-title"
            component="img"
            alt="Book image"
            height="250"
            image={book.backgroundImage}
            title={book.title}
          />
          <CardContent className="text-muted border-top py-3">
            <div className={classes.bookInfo}>
              <Typography variant="body1" color="textPrimary" paragraph >
                {book.body}
              </Typography>
              <Grid>
                <Typography className="card-details" variant="body1" color="textSecondary" gutterBottom >
                  By{" "}{book.author} | {book.totalCopies - book.copiesCheckedOut}{" "}Available | Checked out by: {getUsers()}
                </Typography>
              </Grid>
            </div>
            <Divider variant="middle" />
            <div className={classes.checkOutButtons}>
              <Button className={`checkout-${book.office_book_id} ${classes.checkOutButton}`} variant="contained" onClick={() => handleCheckout(book.office_book_id)}>
                Check out
              </Button>

              <Button className={`checkin-${book.office_book_id} ${classes.checkInButton}`} variant="contained" onClick={() => handleCheckIn(book.office_book_id)}>
                Check in
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Container >
  );
}
