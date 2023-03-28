import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { GroceryListPageComponent } from './grocery-list-page.component';
import { AppModule } from '../app.module';
import { WelcomeComponent } from '../welcome/welcome.component';

describe('GroceryListPageComponent', () => {
  let component: GroceryListPageComponent;
  let fixture: ComponentFixture<GroceryListPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryListPageComponent],
      imports: [
        AppModule
      ],
      
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryListPageComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  })

  it('should create the grocery list page component', waitForAsync(() => {
    const fixture = TestBed.createComponent(GroceryListPageComponent);
    const grocListPage = fixture.debugElement.componentInstance;
    expect(grocListPage).toBeTruthy();}))


});