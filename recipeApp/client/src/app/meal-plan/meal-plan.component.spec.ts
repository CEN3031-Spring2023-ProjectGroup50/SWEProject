import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { MealDeleteConfirmationDialog, MealDetailsDialog, MealEditDialog, MealPlanComponent } from './meal-plan.component';
import { AppModule } from '../app.module';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MealPlanModule', () => {
  let componentMain: MealPlanComponent;
  let fixtureMain: ComponentFixture<MealPlanComponent>;

  let componentDetails: MealDetailsDialog;
  let fixtureDetails: ComponentFixture<MealDetailsDialog>;

  let componentEdit: MealEditDialog;
  let fixtureEdit: ComponentFixture<MealEditDialog>;

  let componentDelete: MealDeleteConfirmationDialog;
  let fixtureDelete: ComponentFixture<MealDeleteConfirmationDialog>;


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
      declarations: [
        MealPlanComponent,
        MealDetailsDialog,
        MealEditDialog,
        MealDeleteConfirmationDialog ],
      imports: [
        AppModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        MatTableDataSource,
        HttpClient,
        HttpHandler,
        ]
    }).compileComponents();

    fixtureMain = TestBed.createComponent(MealPlanComponent);
    componentMain = fixtureMain.componentInstance;

    fixtureDetails = TestBed.createComponent(MealDetailsDialog);
    componentDetails = fixtureDetails.componentInstance;

    fixtureEdit = TestBed.createComponent(MealEditDialog);
    componentEdit = fixtureEdit.componentInstance;

    fixtureDelete = TestBed.createComponent(MealDeleteConfirmationDialog);
    componentDelete = fixtureDelete.componentInstance;

    testMeal1 = {
      Mid: 0,
      Date: componentMain.viewDate,
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
      Date: componentMain.viewDate,
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
      Date: componentMain.viewDate,
      Mealtype: 'Dinner',
      Title: 'Test Meal 3',
      Ingredients: '',
      Instructions: '',
      Image_name: '',
      Email: '',
      Image: []
    }


  }));

  it('should compile all relevant components', () => {
    expect(componentMain).toBeTruthy();
    expect(componentDetails).toBeTruthy();
    expect(componentEdit).toBeTruthy();
    expect(componentDelete).toBeTruthy();
  })

  it('main mealplan component contains a list of meals', () => {
    componentMain.userMeals = [testMeal1, testMeal2, testMeal3];
    expect(componentMain.userMeals.length).toBe(3);
  })

  it('converts meals to events', () => {
    componentMain.userMeals = [testMeal1, testMeal2, testMeal3];
    componentMain.convertToEvents(componentMain.userMeals);
    expect(componentMain.events.length).toBe(3);
  })

  it('displays the header', () => {
    let element = fixtureMain.debugElement.query(By.css('#header'));
    expect(element.nativeElement).toBeTruthy();
  })

  it('clicking a meal in the calendar opens the details dialog', () => {
    componentMain.userMeals = [testMeal1, testMeal2, testMeal3];
    componentMain.convertToEvents(componentMain.userMeals);
    let spy = spyOn(componentMain, "openDialog");

    fixtureMain.detectChanges();
    let buttonElement = fixtureMain.debugElement.query(By.css('mwl-calendar-week-view'));
    buttonElement.triggerEventHandler('eventClicked', {event: testMeal1});

    expect(spy).toHaveBeenCalled();
  })

  it('clicking "Update meal" opens the update dialog', () => {
    componentMain.userMeals = [testMeal1, testMeal2, testMeal3];
    componentMain.convertToEvents(componentMain.userMeals);
    fixtureMain.detectChanges();
    let buttonElement = fixtureMain.debugElement.query(By.css('mwl-calendar-week-view'));
    buttonElement.triggerEventHandler('eventClicked', {event: testMeal1});

    let spy = spyOn(componentDetails, "openEditMealDialog");
    let button = fixtureDetails.debugElement.query(By.css('#updateMeal'));
    button.triggerEventHandler('click', testMeal1.Mid);
    expect(spy).toHaveBeenCalled();
  })

  it('clicking "Delete meal" opens the delete dialog', () => {
    componentMain.userMeals = [testMeal1, testMeal2, testMeal3];
    componentMain.convertToEvents(componentMain.userMeals);
    fixtureMain.detectChanges();
    let buttonElement = fixtureMain.debugElement.query(By.css('mwl-calendar-week-view'));
    buttonElement.triggerEventHandler('eventClicked', {event: testMeal1});

    let spy = spyOn(componentDetails, "openDeleteMealDialog");
    let button = fixtureDetails.debugElement.query(By.css('#deleteMeal'));
    button.triggerEventHandler('click', testMeal1.Mid);
    expect(spy).toHaveBeenCalled();
  })

  it('submitting the Update form calls Edit Dialog\'s "editMeal()', () => {
    componentMain.userMeals = [testMeal1, testMeal2, testMeal3];
    componentMain.convertToEvents(componentMain.userMeals);
    fixtureMain.detectChanges();
    let buttonElement = fixtureMain.debugElement.query(By.css('mwl-calendar-week-view'));
    buttonElement.triggerEventHandler('eventClicked', {event: testMeal1});

    let button = fixtureDetails.debugElement.query(By.css('#updateMeal'));
    button.triggerEventHandler('click', testMeal1.Mid);

    let submitBtn = fixtureEdit.debugElement.query(By.css('#submit'));
    let spy = spyOn(componentEdit, "editMeal");
    submitBtn.triggerEventHandler('click', testMeal1.Mid);
    expect(spy).toHaveBeenCalled();
  })

  it('confirming deletion calls deleteDialog\'s deleteMeal()', () => {
    componentMain.userMeals = [testMeal1, testMeal2, testMeal3];
    componentMain.convertToEvents(componentMain.userMeals);
    fixtureMain.detectChanges();
    let buttonElement = fixtureMain.debugElement.query(By.css('mwl-calendar-week-view'));
    buttonElement.triggerEventHandler('eventClicked', {event: testMeal1});

    let button = fixtureDetails.debugElement.query(By.css('#deleteMeal'));
    button.triggerEventHandler('click', testMeal1.Mid);

    let deleteConf = fixtureDelete.debugElement.query(By.css('#delete'));
    let spy = spyOn(componentDelete, "deleteMeal");
    deleteConf.triggerEventHandler('click', testMeal1.Mid);
    expect(spy).toHaveBeenCalled();

  })
});
