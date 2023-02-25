import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MenuNavigationComponent } from "./menu-navigation.component";

describe('Menu Navigation Component', () => {

  it('mounts', () => {
    cy.mount(MenuNavigationComponent, {
      declarations: [MenuNavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    })
  })

  it('displays menu text', () => {
    cy.mount(MenuNavigationComponent, {
      declarations: [MenuNavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    })
    cy.get('[data-cy="menuText"]')
      .should('have.text', ' Show or hide menu\n')
    cy.get('[data-cy="recipes"]')
      .should('have.text', 'Recipes')
    cy.get('[data-cy="mealplan"]')
      .should('have.text', 'Meal Plan')
    cy.get('[data-cy="grocerylist"]')
      .should('have.text', 'Grocery List')
  })

 /* it('toggles the menu', () => {
    cy.mount(MenuNavigationComponent, {
      declarations: [MenuNavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    })

    cy.get('[data-cy=menuText]')
      .should('be.visible')
      .trigger('click')
      //.should('not.be.visible')



    //cy.get('[data-cy=menuText]').should('not.be.visible')
  })*/
  //Do we need to test the Button module if it comes from Angular Material and not custom Component??
})
