import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Routes, Router, RouterModule } from '@angular/router';

import { registerFormComponent } from './registerform.component';
import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HomeComponent } from '../home/home.component';

import { AuthInterceptorService } from '../shared/auth/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
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

describe('registrationForm', () => {

  let component: registerFormComponent;
  let fixture: ComponentFixture<registerFormComponent>;

  // const routes: Routes = [
  //   {path: '', redirectTo: 'themen', pathMatch: 'full'},
  //   {path: 'meeting', component: HomeComponent},
  //   {path: '**', redirectTo: 'themen', pathMatch: 'full'}
  // ];

  beforeEach(waitForAsync(() => {

    //component = new registerFormComponent(routerSpy, new FormBuilder(), loginServiceSpy);

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
        //RouterTestingModule
      ],
      providers: [
        HttpClient,
        //{provide: registerFormComponent, useValue: loginServiceSpy},
        FormBuilder,
        //{ provide: Router, useValue: routerSpy }
        AuthService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true
            },
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