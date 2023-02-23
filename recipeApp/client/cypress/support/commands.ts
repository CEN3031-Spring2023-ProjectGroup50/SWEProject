/// <reference types="cypress" />


//uncaught exception handle for mat-button drawer toggle
Cypress.on('uncaught:exception', (err, runnable) => {
  // we expect a 3rd party library error with message '_r0.toggle is not a function'
  // and don't want to fail the test so we return false
  if (err.message.includes('_r0.toggle is not a function')) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
  return
})
