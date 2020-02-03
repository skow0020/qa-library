import AddArticle from './AddArticle';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AddArticle Snapshot Tests', () => {
  test('AddArticle snapshot', () => {
    const component = renderer.create(
      <AddArticle></AddArticle>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});