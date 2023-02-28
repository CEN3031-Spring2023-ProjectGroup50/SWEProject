import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from './app.module';
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
  })


  //should display Welcome Banner along the top saying "Welcome to Mallow"
  it('should display "Welcome to Mallow" in the initial span', () => {
    expect(component.title).toBe('Welcome to Mallow');
    const title = fixture.debugElement.query(By.css('#welcome')).nativeElement;
    expect(title.innerHTML).toBe('Welcome to Mallow');
  })

  //should display menu icon, favorite icon, and share icons in the same banner
  it('should display menu, favorite, and share icons', () => {
    //menu icon
    const menuIcon = fixture.debugElement.query(By.css('#menu')).nativeElement;
    expect(menuIcon.innerHTML).toBe('menu');

    //favorite icon
    const favoriteIcon = fixture.debugElement.query(By.css('#favorite')).nativeElement;
    expect(favoriteIcon.innerHTML).toBe('favorite');

    //share icon
    const shareIcon = fixture.debugElement.query(By.css('#share')).nativeElement;
    expect(shareIcon.innerHTML).toBe('share');
  })


})
