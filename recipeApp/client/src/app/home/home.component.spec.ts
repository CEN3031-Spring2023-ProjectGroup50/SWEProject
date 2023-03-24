import { HomeComponent } from './home.component';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from '../app.module';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ HomeComponent ],
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should compile', () => {
    expect(component).toBeTruthy();
  })
})

