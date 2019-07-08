import Books from './Books';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Books Snapshot Tests', () => {
  test('Books snapshot', () => {
    const component = renderer.create(
      <Books></Books>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});