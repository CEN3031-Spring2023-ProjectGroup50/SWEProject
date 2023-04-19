import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { GroceryListComponent } from './grocery-list.component';
import { AppModule } from '../app.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { By } from '@angular/platform-browser';

describe('GroceryListComponent', () => {
  let component: GroceryListComponent;
  let fixture: ComponentFixture<GroceryListComponent>;

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryListComponent],
      imports: [
        AppModule
      ],

    }).compileComponents();

    fixture = TestBed.createComponent(GroceryListComponent);
    component = fixture.componentInstance;

    testMeal1 = {
      Mid: 0,
      Date: component.viewDate,
      Mealtype: 'Breakfast',
      Title: 'Test Meal 1',
      Ingredients: '[\'carrots\', \'broccoli\', \'celery\']',
      Instructions: '',
      Image_name: '',
      Email: '',
      Image: []
    }

  }));

  it('component should compile', () => {
    expect(component).toBeTruthy();
  })

  it('test component should have 1 meal in userMeals', () => {
    component.userMeals = [testMeal1];
    expect(component.userMeals.length).toBe(1);
  })

});
