import LibraryDash from './LibraryDash';
import React from 'react';
import renderer from 'react-test-renderer';

describe('LibraryDash Snapshot Tests', () => {
  test('LibraryDash snapshot', () => {
    const component = renderer.create(
      <LibraryDash></LibraryDash>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});