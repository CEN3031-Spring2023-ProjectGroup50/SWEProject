import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { MealPlanComponent } from './meal-plan.component';
import { AppModule } from '../app.module';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('MealPlanModule', () => {
  let component: MealPlanComponent;
  let fixture: ComponentFixture<MealPlanComponent>;
  interface userMeal {
    Mid: number,
    Date: Date,
    Mealtype: string,
    Title: string,
    Ingredients: string,
    Instructions: string,
    Image_name: string,
    Email: string,
    Image: Uint8Array[],
  }
  let testMeal1: userMeal;
  let testMeal2: userMeal;
  let testMeal3: userMeal;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlanComponent],
      imports: [
        AppModule,
        MatSnackBarModule
      ],
      providers: [MatTableDataSource]
    }).compileComponents();

    fixture = TestBed.createComponent(MealPlanComponent);
    component = fixture.componentInstance;

    testMeal1 = {
      Mid: 0,
      Date: component.viewDate,
      Mealtype: 'Breakfast',
      Title: 'Test Meal 1',
      Ingredients: '',
      Instructions: '',
      Image_name: '',
      Email: '',
      Image: []
    }
    testMeal2 = {
      Mid: 1,
      Date: component.viewDate,
      Mealtype: 'Lunch',
      Title: 'Test Meal 2',
      Ingredients: '',
      Instructions: '',
      Image_name: '',
      Email: '',
      Image: []
    }
    testMeal3 = {
      Mid: 2,
      Date: component.viewDate,
      Mealtype: 'Dinner',
      Title: 'Test Meal 3',
      Ingredients: '',
      Instructions: '',
      Image_name: '',
      Email: '',
      Image: []
    }


  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  })


  it('component contains a list of meals', () => {
    component.userMeals = [testMeal1, testMeal2, testMeal3];
    expect(component.userMeals.length).toBe(3);
  })

  it('converts meals to events', () => {
    component.userMeals = [testMeal1, testMeal2, testMeal3];
    component.convertToEvents(component.userMeals);
    expect(component.events.length).toBe(3);
  })

  it('displays the header', () => {
    let element = fixture.debugElement.query(By.css('#header'));
    expect(element.nativeElement).toBeTruthy();
  })

});
