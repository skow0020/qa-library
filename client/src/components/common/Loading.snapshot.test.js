import Loading from './Loading';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Loading Snapshot Tests', () => {
  test('Loading snapshot', () => {
    const component = renderer.create(
      <Loading />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});