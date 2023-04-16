import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppModule } from './app.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';

let loader: HarnessLoader;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, AppHeaderComponent ],
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

  it('app component should compile', () => {
    expect(component).toBeTruthy();
  });

  it('displays the app-header', () => {
    let element = fixture.debugElement.query(By.css('#app-header'));
    expect(element.nativeElement).toBeTruthy();
  })

});
