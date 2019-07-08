import PageTitle from './PageTitle';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PageTitle Snapshot Tests', () => {
  test('Link changes the class when hovered', () => {
    const component = renderer.create(
      <PageTitle></PageTitle>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});