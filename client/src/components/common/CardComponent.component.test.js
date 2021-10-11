import CardComponent from './CardComponent';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import { mount } from '@cypress/react';
import Colors from 'utils/Colors';

describe('CardComponent Unit Tests', () => {
  it('CardComponent renders with info', () => {
    mount(<CardComponent
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
    />);

    cy.get('#article-card-7 a')
      .invoke('attr', 'href')
      .should('eq', 'www.snowflakes.com/wooo');

    cy.get('[class*=-avatar] span').contains('UI Automation');
    cy.get('#article-card-7').contains('UI AutomationChirpy iguanas of guadalupeBy Corrin TuppleWell if there isn\'t somethin ado about nothing, then what?');
  });
});
