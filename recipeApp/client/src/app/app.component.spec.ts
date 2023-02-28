import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from './app.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';

let loader: HarnessLoader;

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        HttpClientModule,
        AppModule
      ],
      providers: [HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  })

  it('should render Login and Register buttons with corresponding text', async() => {
    const buttons = fixture.debugElement.query(By.css('.example-button-row')).nativeElement;
    expect(buttons.childNodes[0].text).toBe('Login');
    expect(buttons.childNodes[1].text).toBe('Register');
  })

  it('Clicking "login" should route user to login page', () => {

  })
});
