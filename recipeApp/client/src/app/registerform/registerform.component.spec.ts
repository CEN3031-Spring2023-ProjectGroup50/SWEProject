import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Routes, Router, RouterModule } from '@angular/router';

import { registerFormComponent } from './registerform.component';
import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HomeComponent } from '../home/home.component';

import { AuthInterceptorService } from '../shared/auth/auth-interceptor.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/auth/auth.service';

describe('registerForm', () => {

  let component: registerFormComponent;
  let fixture: ComponentFixture<registerFormComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        registerFormComponent
    ],
    imports:[
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        RouterModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatMenuModule,
        LayoutModule,
        MatPaginatorModule,
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        AuthService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true
            },
      ]
    }).compileComponents();
 }));

 beforeEach(() => {
  fixture = TestBed.createComponent(registerFormComponent);
  component = fixture.componentInstance;
});

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('contains form fields for email and password', () => {
    let email = fixture.debugElement.query(By.css('#email'));
    let pass = fixture.debugElement.query(By.css('#pass'));
    let textTest = fixture.debugElement.nativeElement;


    expect(email).toBeTruthy();
    expect(pass).toBeTruthy();

    fixture.detectChanges();
    expect(textTest.querySelector('#emailLabel').textContent).toBe('E-mail');
    expect(textTest.querySelector('#passLabel').textContent).toBe('Password');
  });

  it('clicking "Register" submits the registration form and calls addLogin()', () => {
    let spy = spyOn(component, "addLogin");
    let btn = fixture.debugElement.query(By.css('#submit'));

    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

})
