
import { registerFormComponent } from './registerform.component'
import { createOutputSpy } from 'cypress/angular'
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { RouterModule, Router } from '@angular/router'
import { HttpClientModule, HttpClient } from '@angular/common/http'



describe('Register Form Component', () => {
  it('mounts', () => {
    cy.mount(registerFormComponent, {
      declarations: [registerFormComponent],
      imports: [
        FormsModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [HttpClient]
    })
  })
})
