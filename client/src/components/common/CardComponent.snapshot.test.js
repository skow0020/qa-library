import CardComponent from './CardComponent';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import renderer from 'react-test-renderer';
import Colors from 'utils/Colors';

describe('CardComponent Accessibility Tests', () => {
  test('CardComponent is accessible', async () => {
    const component = renderer.create(
      <CardComponent
        idx='article-card-7'
        url='www.snowflakes.com/wooo'
        urlTarget="_blank"
        title='Chirpy iguanas of guadalupe'
        subheader='By Corrin Tupple'
        avatar={<Chip
          size="small"
          label="UI Automation"
          style={{backgroundColor: Colors.blue}}
        />}
        backgroundImage="www.images.com/orcas.png"
        body="Well if there isn't somethin ado about nothing, then what?"
      />
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
