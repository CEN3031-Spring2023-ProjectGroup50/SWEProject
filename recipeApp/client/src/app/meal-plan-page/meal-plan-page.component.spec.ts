import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { MealPlanPageComponent } from './meal-plan-page.component';
import { AppModule } from '../app.module';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';

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

    fixture = TestBed.createComponent(MealPlanPageComponent);
    component = fixture.componentInstance;
  }));

  it('should create meal plan page', () => {
    expect(component).toBeTruthy();
  })

  it('should display the menu-nav for the meal plan page', () => {
    let element = fixture.debugElement.query(By.css('#menuNav'));
    expect(element.nativeElement).toBeTruthy();
  })

});
