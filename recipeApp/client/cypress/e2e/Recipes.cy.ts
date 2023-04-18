/* THESE TESTS REQUIRE THAT BOTH THE SERVER AND CLIENT ARE UP AND RUNNING
    RUN "MAKE DEV" IN THE SERVER FOLDER
    RUN "MAKE DEV" IN THE CLIENT FOLDER
    THEN RUN "NPX CYPRESS OPEN" IN THE CLIENT FOLDER TO BEGIN TESTS */

describe('Home Page(Recipes)', () => {

  beforeEach(() => {
    cy.viewport(1500, 600)
    cy.visit('http://localhost:4200')

    cy.contains('Login').click();
    cy.url().should('include', '/login')

    cy.get('#email').type('test@test.com')
    cy.get('#pass').type('gogolbordello')

    cy.wait(500);
    cy.contains('Log In').click();
    cy.url().should('include', '/home');
  })

  it('filters recipes based on user created or all', () => {
    //Assertion tests for these! What to check?
    cy.wait(1000);
    cy.get('#userFilter').click();

    cy.wait(1000);
    cy.get('#allFilter').click();
    cy.wait(1000);
  })

  it('adds a recipe', () => {
    cy.wait(1000);
    cy.contains('Add Recipe').click();
    cy.get('#form').should('exist');
    cy.wait(1500);

    cy.contains('Title').type('Testing Recipe');
    cy.wait(500)
    cy.get('#ingredients').type('Ingred. 1 \nIngred. 2')
    cy.wait(500)
    cy.get('#instructions').type('Put in oven. \nBake at 350.')
    cy.wait(500)

    cy.get('#save').click();

    cy.wait(1000);
    cy.get('#userFilter').click();
    cy.contains('Testing Recipe').should('contain', 'Testing Recipe');
  })

  it('views a recipe', () => {
    cy.get('#userFilter').click();
    cy.wait(500);
    cy.get('#list').get('#card').get('#more').click();
    cy.wait(100)
    cy.get('#view').click();
    cy.get('#view-dialog').should('exist');

    cy.wait(1500);
    cy.contains('Close').click();
    cy.get('#view-dialog').should('not.exist');
  })

  it('edits a recipe', () => {
    cy.get('#userFilter').click();
    cy.wait(500);
    cy.get('[style="left: calc((25% - 0.75px + 1px) * 2); width: calc((25% - 0.75px) * 1 + 0px); top: calc(401px); height: calc(400px);"] > .mat-grid-tile-content > #card > .mat-mdc-card-header > #more > .mat-mdc-button-touch-target').scrollIntoView({duration: 1500}).click();
    cy.wait(100)
    cy.get('#edit-btn').click();
    cy.get('#edit').should('exist');

    cy.get('#title').clear().type('Testing Meal Edited');
    cy.wait(500)
    cy.get('#ingredients').clear().type('change the ingredients')
    cy.wait(500)
    cy.get('#instructions').clear().type('change the instructions')
    cy.wait(500)

    cy.contains('Update recipe').click();
    cy.wait(1500);

    cy.get('[style="left: calc((25% - 0.75px + 1px) * 2); width: calc((25% - 0.75px) * 1 + 0px); top: calc(401px); height: calc(400px);"] > .mat-grid-tile-content > #card > .mat-mdc-card-header > #more > .mat-mdc-button-touch-target').click();
    cy.wait(100)
    cy.get('#view').click();
    cy.get('#view-dialog').should('contain', 'Testing Meal Edited');
    cy.get('#dialog-ing').should('contain', 'change the ingredients');
    cy.get('#dialog-inst').should('contain', 'change the instructions');
    cy.wait(500)
    cy.contains('Close').click();

  })

  it('deletes a recipe', () => {
    cy.get('#userFilter').click();
    cy.wait(500);
    cy.get('[style="left: calc((25% - 0.75px + 1px) * 2); width: calc((25% - 0.75px) * 1 + 0px); top: calc(401px); height: calc(400px);"] > .mat-grid-tile-content > #card > .mat-mdc-card-header > #more > .mat-mdc-button-touch-target').click();
    cy.wait(100)
    cy.get('#delete-btn').click();
    cy.get('#delete-dialog').should('exist');
    cy.wait(500)
    cy.get('#delete').click();

    cy.wait(150)
    cy.get('#userFilter').click();
    cy.wait(250);

    cy.get('#list').should('not.contain', 'Testing Meal Edited');
  })
})
