/* THESE TESTS REQUIRE THAT BOTH THE SERVER AND CLIENT ARE UP AND RUNNING
    RUN "MAKE DEV" IN THE SERVER FOLDER
    RUN "MAKE DEV" IN THE CLIENT FOLDER
    THEN RUN "NPX CYPRESS OPEN" IN THE CLIENT FOLDER TO BEGIN TESTS */

describe('Grocery List Page', () => {
  beforeEach(() => {
    cy.viewport(1500, 600)
    cy.visit('http://localhost:4200')
    cy.clock(Date.UTC(2023, 3, 17), ['Date']);
    cy.contains('Login').click();
    cy.get('#email').type('test@test.com')
    cy.get('#pass').type('gogolbordello')
    cy.wait(150);
    cy.contains('Log In').click();
    cy.wait(1000)
    cy.contains('Grocery List').click();
    cy.wait(100)
  })

  it('routes to Grocery List page on click', () => {
    cy.url().should('contain','/grocerylist')
  })

  it('displays ingredients for slotted recipes, and show no recipes if no recipes are slotted', () => {
    cy.get('#list').should('be.visible');
    cy.wait(1500);
    cy.get('[mwlcalendarnextview=""] > .mdc-button__label').click();
    cy.wait(1500);
    cy.get('app-grocery-list > .ng-star-inserted').should('be.visible');

  })
})
