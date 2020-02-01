import CardComponent from './CardComponent';
import React from 'react';
import { axe } from 'setupTests';
import { render } from 'react-dom';
import Chip from '@material-ui/core/Chip';
import { act } from 'react-dom/test-utils';
import Colors from 'utils/Colors';

describe('CardComponent Accessibility Tests', () => {
  test('CardComponent is accessible', async () => {
    let container = global.container;

    act(() => render(<CardComponent
      idx='article-card-7'
      url='www.snowflakes.com/wooo'
      urlTarget="_blank"
      title='Chirpy iguanas of guadalupe'
      subheader='By Corrin Tupple'
      avatar={<Chip
        size="small"
        label="UI Automation"
        style={{ backgroundColor: Colors.blue }}
      />}
      backgroundImage="www.images.com/orcas.png"
      body="Well if there isn't somethin ado about nothing, then what?"
    />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
