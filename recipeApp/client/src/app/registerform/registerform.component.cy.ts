import { registerFormComponent } from './registerform.component'
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule, FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { Router, RouterModule } from '@angular/router';
import { createOutputSpy } from 'cypress/angular'

import { AuthService } from '../shared/auth/auth.service';
import { AuthInterceptorService } from '../shared/auth/auth-interceptor.service';

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
            AuthService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true
            },
        ]
    })
  })
})

