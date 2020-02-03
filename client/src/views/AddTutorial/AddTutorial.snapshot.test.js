import AddTutorial from './AddTutorial';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AddTutorial Snapshot Tests', () => {
  test('AddTutorial snapshot', () => {
    const component = renderer.create(
      <AddTutorial></AddTutorial>
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});