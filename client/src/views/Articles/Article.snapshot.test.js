import Articles from './Articles';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Articles Snapshot Tests', () => {
  test('Articles snapshot', () => {
    const component = renderer.create(
      <Articles></Articles>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});