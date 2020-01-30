import AddBook from './AddBook';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AddBook Snapshot Tests', () => {
  test('AddBook snapshot', () => {
    const component = renderer.create(
      <AddBook></AddBook>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});