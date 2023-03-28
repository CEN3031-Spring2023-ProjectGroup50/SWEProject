import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from '../app.module';
import {By} from '@angular/platform-browser';


describe('WelcomeComponent', () => {

  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ WelcomeComponent ],
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
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should create the welcome component', waitForAsync(() => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const welcome = fixture.debugElement.componentInstance;
    expect(welcome).toBeTruthy();
  }));

  it(`should have as list of size 3 (currently hardcoded)`, waitForAsync(() => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const app = fixture.debugElement.componentInstance;
    const items= fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(items.length).toBe(3);
  }));

  // For later: https://www.thecodebuzz.com/unit-testing-angular-lists-of-elements/
//   it('should create one li for each hero', () => {
//     mockHeroService.getHeroes.and.returnValue(of(HEROES));
//     fixture.detectChanges();
//     expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(4);
// });

})
