import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { AddMealplanDialogComponent, AddMealplanContentComponent } from './add-mealplan-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('AddMealplanContentComponent', () => {
  let componentBtn: AddMealplanDialogComponent;
  let fixtureBtn: ComponentFixture<AddMealplanDialogComponent>;
  let componentDia: AddMealplanContentComponent;
  let fixtureDia: ComponentFixture<AddMealplanContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMealplanDialogComponent ],
      imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        HttpClient,
        HttpHandler,
        AuthService
      ]
    })
    .compileComponents();

    fixtureBtn = TestBed.createComponent(AddMealplanDialogComponent);
    componentBtn = fixtureBtn.componentInstance;
    fixtureBtn.detectChanges();

    fixtureDia = TestBed.createComponent(AddMealplanContentComponent);
    componentDia = fixtureDia.componentInstance;
    fixtureDia.detectChanges();

  });


  it('should create AddMealplanDialogComponent', () => {
    expect(componentBtn).toBeTruthy();
  });

  it('should create AddMealplanContentComponent', () => {
    expect(componentDia).toBeTruthy();
  });

  it('AMDC contains a button "Add to meal plan" to open dialog', () => {
    const buttonElement = fixtureBtn.debugElement.nativeElement.querySelector('#addMeal');
    expect(buttonElement.textContent).toBe('Add to meal plan');
  });

  it('AMDC opens the dialog upon button click', fakeAsync(() => {
    spyOn(componentBtn, "openDialog");

    let buttonElement = fixtureBtn.debugElement.query(By.css('#addMeal'));
    buttonElement.nativeElement.click();

    expect(componentBtn.openDialog).toHaveBeenCalled();
  }));

  it('submitting form calls addToMeal()', () => {
    let spy = spyOn(componentDia, "addToMeal");
    let form = fixtureDia.debugElement.query(By.css('#form'));

    form.triggerEventHandler('submit', null);
    fixtureDia.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('clicking Cancel calls onNoClick() (closes the dialog)', () => {
    let spy = spyOn(componentDia, "onNoClick");
    let btn = fixtureDia.debugElement.query(By.css('#cancel'));
    btn.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

});
