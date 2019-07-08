import QADashboard from './QADashboard';
import React from 'react';
import renderer from 'react-test-renderer';

describe('QADashboard Snapshot Tests', () => {
  test('QADashboard snapshot', () => {
    const component = renderer.create(
      <QADashboard></QADashboard>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});