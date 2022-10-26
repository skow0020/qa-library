/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import CardComponent from 'components/common/CardComponent';
import CategoriesSelection from 'components/common/CategoriesSelection';
import Chip from '@material-ui/core/Chip';
import Colors from 'utils/Colors';
import Grid from '@material-ui/core/Grid';
import LanguagesSelection from 'components/common/LanguagesSelection';
import { Link } from 'react-router-dom';
import LoadError from 'components/common/LoadError';
import Loading from 'components/common/Loading';
import PageTitle from 'components/common/PageTitle';
import { getCategoryTheme } from 'utils/util';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  addButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginLeft: 'auto'
  }
}));

export default function Articles() {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    getArticles();
  }, [category]);
  useEffect(() => {
    getArticles();
  }, [language]);

  const getArticles = () => {
    const categoryFilter = category ? `category=${category}` : '';
    const languageFilter = language ? `language=${language}` : '';
    const filter = `${categoryFilter}&${languageFilter}`;

    setIsLoading(true);
    fetch(`/api/articles?${filter}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setArticles(data.data);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        }
      );
  };

  if (isLoading) return <Loading />;

  if (error) return <LoadError error='Articles failed to load' />;

  return (
    <Grid container>
      <Grid container alignItems='center'>
        <PageTitle title='Articles' />
        <Button
          id='add-article'
          component={Link}
          to='/add-article'
          variant='contained'
          className={classes.addButton}
        >
          Add Article
        </Button>
      </Grid>
      <Grid>
        <form id='filtering-form'>
          <CategoriesSelection
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <LanguagesSelection
            id='language'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </form>
      </Grid>
      <Grid container spacing={4}>
        {articles.map((post, idx) => (
          <Grid item md={4} key={idx}>
            <CardComponent
              idx={`article-card-${idx}`}
              url={post.url}
              urlTarget='_blank'
              title={post.title}
              subheader={`By ${post.author}`}
              avatar={
                <Chip
                  size='small'
                  label={post.category}
                  style={{
                    backgroundColor: post.category
                      ? getCategoryTheme(post.category)
                      : Colors.blue
                  }}
                />
              }
              backgroundImage={post.backgroundImage}
              body={post.body}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
