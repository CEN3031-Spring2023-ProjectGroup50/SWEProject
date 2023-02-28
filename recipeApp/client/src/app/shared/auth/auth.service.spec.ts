import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptorService } from './auth-interceptor.service';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        HttpClient,
    ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
