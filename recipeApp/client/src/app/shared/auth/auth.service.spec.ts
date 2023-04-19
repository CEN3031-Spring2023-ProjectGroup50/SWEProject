import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoginEditorComponent } from 'src/app/login-editor/login-editor.component';
import { HomeComponent } from 'src/app/home/home.component';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;
  let spyRes: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: LoginEditorComponent,},
      { path: 'home', component: HomeComponent,}])
      ],
      providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        HttpClient
      ],
      teardown: {destroyAfterEach: false}
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(AuthService);
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

  it('should set tokens in local storage', () => {
    spyRes = httpClientSpy.post.and.returnValue(jasmine.createSpyObj('HttpResponse', ['token', 'refreshToken']));
    service.login(spyRes);
    expect(localStorage.getItem(service.TOKEN_KEY)).toBeTruthy();
    expect(localStorage.getItem(service.REFRESH_TOKEN_KEY)).toBeTruthy();
    service.logout();
  });

  it('should return true for isAuthenticated when login is called', () => {
    spyRes = httpClientSpy.post.and.returnValue(jasmine.createSpyObj('HttpResponse', ['token', 'refreshToken']));
    service.login(spyRes);
    expect(service.isAuthenticated).toBe(true);
    service.logout();
  });

  it('should return false for isAuthenticated when logout is called', () => {
    spyRes = httpClientSpy.post.and.returnValue(jasmine.createSpyObj('HttpResponse', ['token', 'refreshToken']));
    service.login(spyRes);
    service.logout();
    expect(service.isAuthenticated).toBe(false);
  });

  it('should remove token from local storage when logout is called', () => {
    spyRes = httpClientSpy.post.and.returnValue(jasmine.createSpyObj('HttpResponse', ['token', 'refreshToken']));
    service.login(spyRes);
    service.logout();
    expect(localStorage.getItem(service.TOKEN_KEY)).toBeFalsy();
  });

  it('should remove refresh token from local storage when logout is called', () => {
    spyRes = httpClientSpy.post.and.returnValue(jasmine.createSpyObj('HttpResponse', ['token', 'refreshToken']));
    service.login(spyRes);
    service.logout();
    expect(localStorage.getItem(service.REFRESH_TOKEN_KEY)).toBeFalsy();
  });

});
