import ExampleRepos from './ExampleRepos';
import React from 'react';
import renderer from 'react-test-renderer';

describe('ExampleRepos Snapshot Tests', () => {
  test('ExampleRepos snapshot', () => {
    const component = renderer.create(
      <ExampleRepos></ExampleRepos>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});