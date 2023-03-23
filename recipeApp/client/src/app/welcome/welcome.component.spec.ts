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
  })


})
