import { MenuNavigationComponent } from "./menu-navigation.component";


describe('MenuNavigationComponent', () => {
  it('mounts', () => {
    cy.mount(MenuNavigationComponent)
  })

  it('displays menu text', () => {
    cy.mount(MenuNavigationComponent)
    cy.get('[data-cy="menuText"]').should('have.text', ' Show or hide menu\n')
    cy.get('[data-cy="recipes"]').should('have.text', 'Recipes')
    cy.get('[data-cy="mealplan"]').should('have.text', 'Meal Plan')
    cy.get('[data-cy="grocerylist"]').should('have.text', 'Grocery List')
  })

  it('toggles the menu', () => {
    cy.mount(MenuNavigationComponent)
    cy.get('[data-cy=menuText]').click()
  })
  //Do we need to test the Button module if it comes from Angular Material and not custom Component??
})
