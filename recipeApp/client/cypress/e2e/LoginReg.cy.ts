describe('Initial Test', () => {
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
