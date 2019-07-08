import React from 'react';
import ResourceLinks from './ResourceLinks';
import renderer from 'react-test-renderer';

describe('ResourceLinks Snapshot Tests', () => {
  test('ResourceLink snapshot', () => {
    const component = renderer.create(
      <ResourceLinks></ResourceLinks>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});