// /* eslint jsx-a11y/anchor-is-valid: 0 */

// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   Col,
//   Container,
//   FormGroup,
//   Row
// } from "shards-react";

// import CategoriesSelection from "components/common/CategoriesSelection";
// import LanguagesSelection from "components/common/LanguagesSelection";
// import LoadError from "components/common/LoadError";
// import Loading from "components/common/Loading";
// import PageTitle from "components/common/PageTitle";
// import React from "react";
// import { getCategoryTheme } from "utils/util";

// class Tutorials extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tutorials: [],
//       isLoading: false,
//       category: '',
//       language: ''
//     };

//     this.getTutorials = this.getTutorials.bind(this);
//     this.handleFilterChange = this.handleFilterChange.bind(this);
//     this.handleLanguageChange = this.handleLanguageChange.bind(this);
//   }

//   componentDidMount() {
//     this.getTutorials();
//   }

//   getTutorials() {
//     const categoryFilter = this.state.category ? `category=${this.state.category}` : '';
//     const languageFilter = this.state.language ? `language=${this.state.language}` : '';
//     const filter = `${categoryFilter}&${languageFilter}`;

//     this.setState({ isLoading: true });
//     fetch(`/api/tutorials?${filter}`)
//       .then(response => response.json())
//       .then(
//         data => this.setState({ tutorials: data.data, isLoading: false }),
//         error => this.setState({ error, isLoading: false })
//       );
//   }

//   nextPath(path) {
//     this.props.history.push(path);
//   }

//   handleFilterChange(e) {
//     this.setState({
//       category: e.target.value
//     }, () => this.getTutorials());
//   }

//   handleLanguageChange(e) {
//     this.setState({
//       language: e.target.value
//     }, () => this.getTutorials());
//   }

//   render() {
//     const { tutorials, isLoading, error, category, language } = this.state;

//     if (isLoading) return <Loading />;

//     if (error) return <LoadError error="Tutorials failed to load" />;

//     return (
//       <Container fluid className="main-content-container px-3">
//         <Row noGutters className="form-inline py-2">
//           <PageTitle sm="8" title="Tutorials" className="text-sm-left" />
//           <Button id="add-tutorial" type="button" className="btn btn-success btn-lg" onClick={() => this.nextPath('/add-tutorial')}>
//             Add Tutorial
//           </Button>
//         </Row>
//         <Row noGutters className="form-inline py-2">
//           <FormGroup id='filtering-form'>
//             <CategoriesSelection id="category" value={category} onChange={this.handleFilterChange} />
//             <LanguagesSelection id="language" value={language} onChange={this.handleLanguageChange} />
//           </FormGroup>
//         </Row>
//         <Row>
//           {tutorials.map((post, idx) => (
//             <Col lg="4" md="6" sm="12" className="mb-4" key={idx}>
//               <Card small id={`tutorial-card-${idx}`} className="card-post card-post--1">
//                 <a href={post.url} target="_blank" rel="noopener noreferrer" aria-label="Navigate to the tutorial url">
//                   <div
//                     className="card-post__image"
//                     style={{ backgroundImage: `url('${post.backgroundImage}')` }}
//                   />
//                 </a>
//                 <Badge pill className={`card-post__category bg-${getCategoryTheme(post.category)}`}>
//                   {post.category}
//                 </Badge>

//                 <CardBody>
//                   <h5 className="card-title">
//                     <a href={post.url} className="text-fiord-blue" target="_blank" rel="noopener noreferrer" aria-label="Navigate to the tutorial url">
//                       {post.title}
//                     </a>
//                   </h5>
//                   <p className="card-text d-inline-block mb-3">{post.body}</p>
//                   <span className="text-muted">{post.date}</span>
//                 </CardBody>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     );
//   }
// }

// export default Tutorials;

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import Button from '@material-ui/core/Button';
import CardComponent from "components/common/CardComponent";
import CategoriesSelection from "components/common/CategoriesSelection";
import Colors from 'utils/Colors';
import Grid from '@material-ui/core/Grid';
import LanguagesSelection from "components/common/LanguagesSelection";
import { Link } from 'react-router-dom';
import LoadError from "components/common/LoadError";
import Loading from "components/common/Loading";
import PageTitle from "components/common/PageTitle";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  addButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginLeft: "auto"
  }
}));

export default function Tutorials() {
  const classes = useStyles();
  const [tutorials, setTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getTutorials();
  }, []);

  useEffect(() => { getTutorials(); }, [category]);
  useEffect(() => { getTutorials(); }, [language]);

  const getTutorials = () => {
    const categoryFilter = category ? `category=${category}` : '';
    const languageFilter = language ? `language=${language}` : '';
    const filter = `${categoryFilter}&${languageFilter}`;

    setIsLoading(true);
    fetch(`/api/tutorials?${filter}`)
      .then(response => response.json())
      .then(
        data => {
          setTutorials(data.data);
          setIsLoading(false);
        },
        error => {
          setError(error);
          setIsLoading(false);
        }
      );
  };

  if (isLoading) return <Loading />;

  if (error) return <LoadError error="Tutorials failed to load" />;

  return (
    <Grid container>
      <Grid container alignItems="center" >
        <PageTitle title="Tutorials" />
        <Button id="add-tutorial" component={Link} to="/add-tutorial" variant="contained" className={classes.addButton}>
          Add Tutorial
        </Button>
      </Grid>
      <Grid >
        <form id='filtering-form'>
          <CategoriesSelection id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <LanguagesSelection id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
        </form>
      </Grid>
      <Grid container spacing={4}>
        {tutorials.map((post, idx) => (
          <Grid item md={4} key={idx}>
            <CardComponent
              idx={`tutorial-card-${idx}`}
              url={post.url}
              title={post.title}
              category={post.category}
              backgroundImage={post.backgroundImage}
              body={post.body}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
