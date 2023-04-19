/* THESE TESTS REQUIRE THAT BOTH THE SERVER AND CLIENT ARE UP AND RUNNING
    RUN "MAKE DEV" IN THE SERVER FOLDER
    RUN "MAKE DEV" IN THE CLIENT FOLDER
    THEN RUN "NPX CYPRESS OPEN" IN THE CLIENT FOLDER TO BEGIN TESTS */

describe('Meal Plan Page', () => {

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
    cy.contains('Meal Plan').click();
    cy.wait(100)
  })

   it('shows the meal plan page when clicked', () => {
    cy.url().should('contain', '/mealplan');
  })
  it('displays the current week of meals', () => {
    cy.get('.cal-day-headers > :nth-child(1)').should('contain', 'Sunday', 'Apr 9');
    cy.get('.cal-day-headers > :nth-child(2)').should('contain', 'Monday', 'Apr 10');
    cy.get('.cal-day-headers > :nth-child(3)').should('contain', 'Tuesday', 'Apr 11');
    cy.get('.cal-day-headers > :nth-child(4)').should('contain', 'Wednesday', 'Apr 12');
    cy.get('.cal-day-headers > :nth-child(5)').should('contain', 'Thursday', 'Apr 13');
    cy.get('.cal-day-headers > :nth-child(6)').should('contain', 'Friday', 'Apr 14');
    cy.get('.cal-day-headers > :nth-child(7)').should('contain', 'Saturday', 'Apr 15');
  })

  it('displays the previous and next weeks\' meals', () => {
    //previous
    cy.get('[mwlcalendarpreviousview=""] > .mdc-button__label').click();
    cy.wait(500);
    cy.get('.cal-day-headers > :nth-child(1)').should('contain', 'Sunday', 'Apr 2');
    cy.get('.cal-day-headers > :nth-child(2)').should('contain', 'Monday', 'Apr 3');
    cy.get('.cal-day-headers > :nth-child(3)').should('contain', 'Tuesday', 'Apr 4');
    cy.get('.cal-day-headers > :nth-child(4)').should('contain', 'Wednesday', 'Apr 5');
    cy.get('.cal-day-headers > :nth-child(5)').should('contain', 'Thursday', 'Apr 6');
    cy.get('.cal-day-headers > :nth-child(6)').should('contain', 'Friday', 'Apr 7');
    cy.get('.cal-day-headers > :nth-child(7)').should('contain', 'Saturday', 'Apr 8');

    //today
    cy.get('.tight-button-row > .mat-primary > .mdc-button__label').click();
    cy.wait(1500);

    //next week
    cy.get('[mwlcalendarnextview=""] > .mdc-button__label').click();
    cy.wait(1500)
    cy.get('.cal-day-headers > :nth-child(1)').should('contain', 'Sunday', 'Apr 16');
    cy.get('.cal-day-headers > :nth-child(2)').should('contain', 'Monday', 'Apr17');
    cy.get('.cal-day-headers > :nth-child(3)').should('contain', 'Tuesday', 'Apr 18');
    cy.get('.cal-day-headers > :nth-child(4)').should('contain', 'Wednesday', 'Apr 19');
    cy.get('.cal-day-headers > :nth-child(5)').should('contain', 'Thursday', 'Apr 20');
    cy.get('.cal-day-headers > :nth-child(6)').should('contain', 'Friday', 'Apr 21');
    cy.get('.cal-day-headers > :nth-child(7)').should('contain', 'Saturday', 'Apr 22');
  })

  it('clicking on a meal displays its details', () => {
    cy.get('.cal-event-title').click();
    cy.wait(100);
    cy.get('.mat-mdc-dialog-surface > .ng-star-inserted')
      .should('be.visible');
    cy.get('.mat-mdc-dialog-content').scrollTo('bottom', {duration: 1500});
  })

  it('clicking "Update meal" or "Remove from meal plan" open respective dialogs', () =>{
    cy.get('.cal-event-title').click();
    cy.wait(100);
    cy.get('.mat-mdc-dialog-surface > .ng-star-inserted')
      .should('be.visible');
    cy.get('.mat-mdc-dialog-content').scrollTo('bottom', {duration: 2000});
    cy.get('#updateMeal').scrollIntoView({duration: 1500}).click();
    cy.wait(500);
    cy.get('meal-edit-dialog.ng-star-inserted').should('be.visible');
    cy.wait(1000);
    cy.get('#cancelUpdate').click();
    cy.wait(1500);

    cy.get('#deleteMeal').scrollIntoView({duration: 1500}).click();
    cy.get('#delete--meal-dialog')
      .should('be.visible');
    cy.wait(1500);
    cy.get('#cancel').click();
    cy.wait(500);

  })
})
