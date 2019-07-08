import React from 'react';
import Tutorials from './Tutorials';
import renderer from 'react-test-renderer';

describe('Tutorials Snapshot Tests', () => {
  test('Tutorials snapshot', () => {
    const component = renderer.create(
      <Tutorials></Tutorials>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});