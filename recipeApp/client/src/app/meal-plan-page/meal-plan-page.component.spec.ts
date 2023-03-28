import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { MealPlanPageComponent } from './meal-plan-page.component';
import { AppModule } from '../app.module';
import { MatTableDataSource } from '@angular/material/table';

describe('MealPlanPageComponent', () => {
  let component: MealPlanPageComponent;
  let fixture: ComponentFixture<MealPlanPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanPageComponent],
      imports: [
        AppModule
      ],
      providers: [MatTableDataSource]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPlanPageComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  })

  it('should create the meal plan page component', waitForAsync(() => {
    const fixture = TestBed.createComponent(MealPlanPageComponent);
    const mealPlanPage = fixture.debugElement.componentInstance;
    expect(mealPlanPage).toBeTruthy();}))

});