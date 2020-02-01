/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';

import CardComponent from 'components/common/CardComponent';
import Chip from '@material-ui/core/Chip';
import Colors from 'utils/Colors';
import Grid from '@material-ui/core/Grid';
import LanguagesSelection from 'components/common/LanguagesSelection';
import LoadError from 'components/common/LoadError';
import Loading from 'components/common/Loading';
import PageTitle from 'components/common/PageTitle';
import TextField from 'components/common/TextField';
import Typography from '@material-ui/core/Typography';
import { getLanguageTheme } from 'utils/util';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  githubUser: {
    marginLeft: 'auto'
  }
}));

export default function ExampleRepos() {
  const classes = useStyles();
  const [githubAccount, setGithubAccount] = useState('skow0020');
  const [githubRepos, setGithubRepos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getRepos();
  }, []);

  useEffect(() => {
    getRepos();
  }, [filter]);

  const getRepos = () => {
    setIsLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${githubAccount}/repos`)
      .then(res => res.json())
      .then(
        (results) => {
          setIsLoading(false);
          if (results.message === 'Not Found') {
            setError('Unable to find repos for the account provided');
            return;
          }
          if (filter) {
            if (filter === 'CSharp') results = results.filter(repo => { return repo.language === 'C#'; });
            else results = results.filter(repo => { return repo.language === filter; });
          }

          setGithubRepos(results);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  };

  const handleGithubAccountSubmit = (e) => {
    e.preventDefault();
    setGithubAccount(githubAccount);
    getRepos();
  };

  return (
    <Grid container>
      <Grid container alignItems="center" >
        <PageTitle title="Example Repos" />
        <Typography id="github-account-text" className={classes.githubUser} variant="h5" color="textSecondary" align="right">
          {githubAccount} Repos
        </Typography>
      </Grid>
      <Grid container>
        <form id='filter-form' onSubmit={handleGithubAccountSubmit}>
          <TextField id="github-account" label="Github Account" value={githubAccount} onChange={(e) => setGithubAccount(e.target.value)} required />
          <LanguagesSelection id="language" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </form>
      </Grid>
      {isLoading && <Loading />} 
      {error && <LoadError error={error} />}
      <Grid container spacing={4}>
        {githubRepos.map((repo, idx) => (
          <Grid item md={6} lg={4} sm={12} key={idx}>
            <CardComponent
              idx={`repo-card-${idx}`}
              url={repo.html_url}
              urlTarget="_blank"
              title={repo.name}
              avatar={<Chip
                size="small"
                label={repo.language}
                style={{ backgroundColor: repo.language ? getLanguageTheme(repo.language) : Colors.blue }}
              />}
              body={repo.description}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}