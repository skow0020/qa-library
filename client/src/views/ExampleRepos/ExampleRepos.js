/* eslint jsx-a11y/anchor-is-valid: 0 */

import {
  Badge,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  FormInput,
  Row
} from "shards-react";

import LanguagesSelection from "components/common/LanguagesSelection";
import LoadError from "components/common/LoadError";
import PageTitle from "components/common/PageTitle";
import React from "react";
import { getLanguageTheme } from "utils/util";

class ExampleRepos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      filter: null,
      githubAccount: 'skow0020',
      githubAccountName: 'skow0020',
      githubRepos: []
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleGithubAccountSubmit = this.handleGithubAccountSubmit.bind(this);
    this.handleGithubAccountChange = this.handleGithubAccountChange.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    fetch(`https://api.github.com/users/${this.state.githubAccount}/repos`)
      .then(res => res.json())
      .then(
        (results) => {
          if (results.message === 'Not Found') {
            this.setState({
              isLoaded: true,
              error: true
            });
            return;
          }
          if (this.state.filter) {
            results = results.filter(result => result.language);
            if (this.state.filter === 'CSharp') results = results.filter(repo => { return repo.language === 'C#'; });
            else results = results.filter(repo => { return repo.language === this.state.filter; });
          }
          this.setState({
            isLoaded: true,
            githubRepos: results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleGithubAccountSubmit(e) {
    e.preventDefault();
    this.setState({
      githubAccount: this.state.githubAccount,
      githubAccountName: this.state.githubAccount
    }, () => this.getRepos());
  }

  handleGithubAccountChange(e) {
    this.setState({
      githubAccount: e.target.value
    });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value
    }, () => this.getRepos());
  }

  render() {
    if (this.state.error) return <LoadError error="Repos failed to load" />;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="form-inline py-2">
          <PageTitle sm="8" title="Example Repos" className="text-sm-left" />
          <FormGroup id='filter-form' onSubmit={this.handleGithubAccountSubmit}>
            <label className="text-muted font-weight-bold px-2" htmlFor="github-account">Github Account</label>
            <FormInput id="github-account" type="text" value={this.state.githubAccount} onChange={this.handleGithubAccountChange} required />
            <LanguagesSelection id="language" value={this.state.language} onChange={this.handleFilterChange} />
          </FormGroup>
        </Row>

        <span className="text-uppercase page-subtitle">{this.state.githubAccountName} Repos</span>
        <Row id="row-0">
          {this.state.githubRepos.map((repo, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card id={`repo-card-${idx}`} small className="card-repo card-repo--1">
                <CardBody>
                  <div>
                    <Badge pill className={`card-repo-badge bg-${getLanguageTheme(repo.language)}`}>
                      {repo.language}
                    </Badge>
                  </div>
                  <h5 className="card-title">
                    <a href={repo.html_url} className="text-fiord-blue" target="_blank" rel="noopener noreferrer" aria-label="Navigate to the repo url">
                      {repo.full_name}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{repo.description}</p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ExampleRepos;
