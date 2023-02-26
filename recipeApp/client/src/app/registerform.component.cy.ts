import { registerFormComponent } from './registerform.component'
import {HttpClientModule, HttpClient} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule, FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { Router, RouterModule } from '@angular/router';
import { createOutputSpy } from 'cypress/angular'

describe('registerFormComponent', () => {
  it('mounts', () => {
    cy.mount(registerFormComponent, {  
        declarations: [
            registerFormComponent,
        ],
        imports: [
            FormsModule,
            RouterModule,
            HttpClientModule,
            ReactiveFormsModule,
        ],
        providers: [
            HttpClient,
        ]
    })
  })
})

