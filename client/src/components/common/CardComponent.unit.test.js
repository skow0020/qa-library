import CardComponent from './CardComponent';
import React from 'react';
import { render } from "react-dom";
import Chip from '@material-ui/core/Chip';
import { act } from "react-dom/test-utils";
import Colors from 'utils/Colors';

describe('CardComponent Accessibility Tests', () => {
  test('CardComponent is accessible', async () => {
    let container = global.container;

    await act(async () => render(
      <CardComponent
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

    expect(container.querySelector('#article-card-7 a').getAttribute('href')).toBe('www.snowflakes.com/wooo');
    expect(container.querySelector('[class*=-avatar] span').textContent).toBe('UI Automation');
    expect(container.querySelector('#article-card-7').textContent).toBe(`UI AutomationChirpy iguanas of guadalupeBy Corrin TuppleWell if there isn't somethin ado about nothing, then what?`);
  });
});
