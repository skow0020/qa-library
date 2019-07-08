import Info from './Info';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Info Snapshot Tests', () => {
  test('Info snapshot', () => {
    const component = renderer.create(
      <Info></Info>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});