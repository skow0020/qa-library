import PropTypes from 'prop-types';
import React from 'react';

const SearchResults = (props) => {
  const results = props.results.map(result => (
    <a href={result.url}>
      <li key={result.id}>{result.title}</li>
    </a>
  ));

  return (
    <div>
      <div id={`${props.searchType}-list`}>
        <h2>{props.searchType}</h2>
        <ul>{results}</ul>
      </div>
    </div>
  );
};
SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  searchType: PropTypes.string.isRequired
};

export default SearchResults;