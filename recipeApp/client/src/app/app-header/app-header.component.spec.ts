import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from '../app.module';
import {By} from '@angular/platform-browser';


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

//header banner on startup
  it('should display "Welcome to Mallow" when logged out (i.e. on startup)', () => {
    expect(component.titleLoggedOut).toBe('Welcome to Mallow!');
  })
})
