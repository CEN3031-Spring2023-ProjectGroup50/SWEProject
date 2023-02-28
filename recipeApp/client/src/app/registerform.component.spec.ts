import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Routes, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import { registerFormComponent } from './registerform.component';
import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HomeComponent } from './home.component';

describe('registrationForm', () => {

  let component: registerFormComponent;

  const routes: Routes = [
    {path: '', redirectTo: 'themen', pathMatch: 'full'},
    {path: 'meeting', component: HomeComponent},
    {path: '**', redirectTo: 'themen', pathMatch: 'full'}
  ];

  beforeEach(waitForAsync(() => {

    //component = new registerFormComponent(routerSpy, new FormBuilder(), loginServiceSpy);

    TestBed.configureTestingModule({
      declarations: [ registerFormComponent ],
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule.withRoutes(routes),
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserModule,
        BrowserAnimationsModule,
      ],
      providers: [
        HttpClient,
        //{provide: registerFormComponent, useValue: loginServiceSpy},
        FormBuilder,
        //{ provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
 }));

  it('should be fine (this is to confirm the test is set up properly)', () => {
      expect(true).toBeTruthy();
  })

  it('should create the registration form', waitForAsync(() => {
    const fixture = TestBed.createComponent(registerFormComponent);
    const regForm = fixture.debugElement.componentInstance;
    expect(regForm).toBeTruthy();
  }));

  it('should render title in a mat-card', waitForAsync(() => {
    const fixture = TestBed.createComponent(registerFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card').textContent).toContain('Register your Account Here');
  }));



  // The email field, password field, and register button should render

  // Display error message when email is blank

  // Display error message when password is blank

  // Display error message when email & password combo exists

  // Successful login should route the user to home page

})