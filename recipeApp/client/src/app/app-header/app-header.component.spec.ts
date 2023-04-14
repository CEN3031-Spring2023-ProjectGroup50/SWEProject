import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from '../app.module';
import { By } from '@angular/platform-browser';

describe('AppHeaderComponent', () => {

  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ AppHeaderComponent ],
        imports:[
          HttpClientModule,
          AppModule
        ],
        providers: [
          HttpClient
        ]
      }).compileComponents();
   }));

   beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should create the App header component', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppHeaderComponent);
    const appHeader = fixture.debugElement.componentInstance;
    expect(appHeader).toBeTruthy();
  }));

  it('should have titleLoggedOut value of "Welcome to Mallow".', () => {
    expect(component.titleLoggedOut).toBe('Welcome to Mallow!');
  });

  it('should display titleLoggedOut when logged out.', waitForAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#titleLoggedOut').textContent).toContain('Welcome to Mallow');
  }));

  it('should have titleLoggedIn value of "Save time, and savor every meal with Mallow."', () => {
    expect(component.titleLoggedIn).toBe('Save time, and savor every meal with Mallow.');
  });

  it('should display titleLoggedIn when logged in.', waitForAsync(() => {
    component.isUserLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    if (compiled) {
      expect(compiled.querySelector('#titleLoggedIn').innerHTML).toBe(component.titleLoggedIn);
    }
  }));


})
