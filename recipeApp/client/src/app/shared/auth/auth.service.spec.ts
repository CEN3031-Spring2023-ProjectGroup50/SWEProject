import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoginEditorComponent } from 'src/app/login-editor/login-editor.component';
import { HomeComponent } from 'src/app/home/home.component';
import { NegateAuthGuard } from './negate-auth.guard';
import { CanActivateViaAuthGuard } from './can-activate-via-auth.guard';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;
  //let router: Router;
  let spyRes: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: LoginEditorComponent,
        canActivate: [ 
          NegateAuthGuard
        ]
     },
      { path: 'home', component: HomeComponent,
        canActivate: [ 
          CanActivateViaAuthGuard 
        ]
      }])
      ],
      providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        HttpClient
    ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(AuthService);
    //router = TestBed.inject(Router);
    //router.initialNavigation();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a login function', () => {
    expect(service.login).toBeTruthy();
  });

  it('should have a logout function', () => {
    expect(service.logout).toBeTruthy();
  });

  // Write a test that checks if the token is set in local storage
  it('should set tokens in local storage', () => {
    spyRes = httpClientSpy.post.and.returnValue(jasmine.createSpyObj('HttpResponse', ['token', 'refreshToken']));
    service.login(spyRes);
    expect(localStorage.getItem(service.TOKEN_KEY)).toBeTruthy();
    expect(localStorage.getItem(service.REFRESH_TOKEN_KEY)).toBeTruthy();
  });

  // Write a test that checks if the isAuthenticated function returns true when there is a token
  it('should return true for isAuthenticated when there is a token; otherwise false', () => {
    spyRes = httpClientSpy.post.and.returnValue(jasmine.createSpyObj('HttpResponse', ['token', 'refreshToken']));
    service.login(spyRes);
    expect(service.isAuthenticated).toBe(true);
  });

  // Write a test that checks if the isAuthenticated function returns false when there is no token
  it('should return false for isAuthenticated when there is no token', () => {
    service.logout();
    expect(service.isAuthenticated).toBe(false);
  });

  // Write a test that checks if the token is removed from local storage when logout is called
  it('should remove token from local storage when logout is called', () => {
    service.logout();
    expect(localStorage.getItem(service.TOKEN_KEY)).toBeFalsy();
  });

  // Write a test that checks if the refresh token is removed from local storage when logout is called
  it('should remove refresh token from local storage when logout is called', () => {
    service.logout();
    expect(localStorage.getItem(service.REFRESH_TOKEN_KEY)).toBeFalsy();
  });

  // Write a test that checks if the isAuthenticated function returns false when logout is called
  it('should return false for isAuthenticated when logout is called', () => {
    service.logout();
    expect(service.isAuthenticated).toBe(false);
  });

  // Write a test that checks if the refresh function returns a token when called
  it('should return a token when refresh is called', () => {
    service.refresh().subscribe((res: any) => {
        expect(res.token).toBeTruthy();
    });
  });

  // Write a test that checks if the refresh function returns a refresh token when called
  it('should return a refresh token when refresh is called', () => {
    service.refresh().subscribe((res: any) => {
        expect(res.refreshToken).toBeTruthy();
    });
  });

  // Write a test that checks if the refresh function sets a token when called
  /*it('should set a token when refresh is called', () => {
    service.refresh().subscribe((res: any) => {
        expect(localStorage.getItem(service.TOKEN_KEY)).toBeTruthy);
    });
  {}*/

});
