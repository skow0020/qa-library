import AddResourceLink from './AddResourceLink';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AddResourceLink Snapshot Tests', () => {
  test('AddResourceLink snapshot', () => {
    const component = renderer.create(
      <AddResourceLink></AddResourceLink>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});