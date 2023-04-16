/* THESE TESTS REQUIRE THAT BOTH THE SERVER AND CLIENT ARE UP AND RUNNING
    RUN "MAKE DEV" IN THE SERVER FOLDER
    RUN "MAKE DEV" IN THE CLIENT FOLDER
    THEN RUN "NPX CYPRESS OPEN" IN THE CLIENT FOLDER TO BEGIN TESTS */

describe('Login Page', () => {
  it('visits the site', () => {
    cy.visit('http://localhost:4200/')
  })

  //add registration info for E2E demo


  it('Logs In', () => {
    cy.visit('http://localhost:4200/')

    cy.contains('Login').click();
    cy.url().should('include', '/login')

    cy.get('#email').type('test@test.com')
    cy.get('#pass').type('gogolbordello')

    cy.contains('Log In').click();
    cy.url().should('include', '/home')
  })

  it('logs out', () => {
    cy.visit('http://localhost:4200/')

    cy.contains('Login').click();
    cy.url().should('include', '/login')

    cy.get('#email').type('test@test.com')
    cy.get('#pass').type('gogolbordello')

    cy.contains('Log In').click();
    cy.url().should('include', '/home')

    cy.contains('Logout').click();
    cy.url().should('not.include', '/home')
  })

})
