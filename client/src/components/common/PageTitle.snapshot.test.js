import PageTitle from './PageTitle';
import React from 'react';
import renderer from 'react-test-renderer';

describe('PageTitle Snapshot Tests', () => {
  test('PageTitle Snapshot', () => {
    const component = renderer.create(
      <PageTitle title="Add an Article"></PageTitle>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});