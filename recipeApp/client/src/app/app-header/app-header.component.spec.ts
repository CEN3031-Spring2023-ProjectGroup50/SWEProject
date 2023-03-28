import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from '../app.module';

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

  it('should have titleLoggedOut value of "Welcome to Mallow".', () => {
    expect(component.titleLoggedOut).toBe('Welcome to Mallow!');
  });

  it('should display titleLoggedOut when logged out.', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppHeaderComponent);
    let comp: AppHeaderComponent = fixture.componentInstance;
    comp.titleLoggedOut = 'Welcome to Mallow';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#titleLoggedOut').textContent).toContain('Welcome to Mallow');
  }));

  it('should have titleLoggedIn value of "Save time, and savor every meal with Mallow."', () => {
    expect(component.titleLoggedIn).toBe('Save time, and savor every meal with Mallow.');
  });

  it('should display titleLoggedIn when logged in.', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppHeaderComponent);
    let comp: AppHeaderComponent = fixture.componentInstance;
    comp.titleLoggedIn = 'Save time, and savor every meal with Mallow.';
    comp.isUserLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#titleLoggedIn').textContent).toContain('Save time, and savor every meal with Mallow.');
  }));


})
