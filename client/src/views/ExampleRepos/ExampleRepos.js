/* eslint-disable react-hooks/exhaustive-deps */

import LanguagesSelection from "components/common/LanguagesSelection";
import LoadError from "components/common/LoadError";
import PageTitle from "components/common/PageTitle";
import Colors from 'utils/Colors';
import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import TextField from "components/common/TextField";
import Loading from "components/common/Loading";
import { getLanguageTheme } from "utils/util";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  githubUser: {
    marginLeft: "auto"
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
        <Typography className={classes.githubUser} variant="h5" color="textSecondary" align="right">
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
            <Card id={idx} className="card-post">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="Navigate to the url" style={{ color: Colors.black }}>
                <CardHeader
                  titleTypographyProps={{ variant: 'h6' }}
                  title={repo.full_name}
                  avatar={
                    <Avatar aria-label="category" style={{ backgroundColor: repo.language ? getLanguageTheme(repo.language) : Colors.blue }}>
                      {repo.language && repo.language.substring(0, 3)}
                    </Avatar>
                  }
                />
              </a>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {repo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}