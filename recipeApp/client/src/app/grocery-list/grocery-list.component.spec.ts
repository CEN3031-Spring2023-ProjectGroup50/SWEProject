import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { GroceryListComponent } from './grocery-list.component';
import { AppModule } from '../app.module';
import { WelcomeComponent } from '../welcome/welcome.component';

describe('GroceryListComponent', () => {
  let component: GroceryListComponent;
  let fixture: ComponentFixture<GroceryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryListComponent],
      imports: [
        AppModule
      ],
      
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryListComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  })

  it('should create the welcome component', waitForAsync(() => {
    const fixture = TestBed.createComponent(GroceryListComponent);
    const appHeader = fixture.debugElement.componentInstance;
    expect(appHeader).toBeTruthy();}))


});