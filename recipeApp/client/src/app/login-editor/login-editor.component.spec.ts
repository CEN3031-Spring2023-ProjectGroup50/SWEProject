import { LoginEditorComponent } from './login-editor.component';

import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { AuthInterceptorService } from '../shared/auth/auth-interceptor.service';

import { FormsModule, ReactiveFormsModule, FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

describe('LoginEditorComponent', () => {

  let component: LoginEditorComponent;
  let fixture: ComponentFixture<LoginEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEditorComponent ],
      imports:[
        HttpClientModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        CommonModule
      ],
      providers: [
        FormBuilder,
        HttpClient,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
      ]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEditorComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('contains a button to login', () => {
    let buttonElement = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    expect(buttonElement.textContent).toBe('Log In');
  });

  it('clicking "Log In" calls addLogin()', () => {
    let spy = spyOn(component, "addLogin");
    let form = fixture.debugElement.query(By.css('#loginForm'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });


})
