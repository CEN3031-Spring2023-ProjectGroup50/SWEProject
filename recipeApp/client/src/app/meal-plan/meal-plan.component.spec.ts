import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { MealPlanComponent } from './meal-plan.component';
import { AppModule } from '../app.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { MatTableDataSource } from '@angular/material/table';

describe('GroceryListComponent', () => {
  let component: MealPlanComponent;
  let fixture: ComponentFixture<MealPlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanComponent],
      imports: [
        AppModule
      ],
      providers: [MatTableDataSource]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPlanComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  })

  it('should create the welcome component', waitForAsync(() => {
    const fixture = TestBed.createComponent(MealPlanComponent);
    const appHeader = fixture.debugElement.componentInstance;
    expect(appHeader).toBeTruthy();}))

  it('should contain users', waitForAsync(() => {
    expect(component.dataSource.data.length).toEqual(100)}))


});