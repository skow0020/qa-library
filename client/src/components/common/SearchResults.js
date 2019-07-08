import React from 'react';

const SearchResults = (props) => {
  const results = props.results.map(r => (
    <a href={r.url}>
      <li key={r.id}>{r.title}</li>
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

export default SearchResults;