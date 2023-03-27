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
  })

  it('should display "Welcome to Mallow" when logged out (i.e. on startup)', () => {
    expect(component.titleLoggedOut).toBe('Welcome to Mallow!');
  })

  it('should display "Save time, and savor every meal with Mallow." when logged out (i.e. on startup)', () => {
    expect(component.titleLoggedIn).toBe('Save time, and savor every meal with Mallow.');
  })

  // it('Should render the slogan in a span tag', waitForAsync(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('span').textContent).toContain('Save time, and savor every meal with Mallow.');
  // }));
})
