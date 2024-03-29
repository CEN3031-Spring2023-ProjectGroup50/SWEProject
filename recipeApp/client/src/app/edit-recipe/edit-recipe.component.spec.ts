import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { EditRecipeModule, EditRecipeContentModule } from './edit-recipe.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { OverlayContainer } from '@angular/cdk/overlay';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('EditRecipeContentModule', () => {
  let componentBtn: EditRecipeModule;
  let fixtureBtn: ComponentFixture<EditRecipeModule>;
  let componentDia: EditRecipeContentModule;
  let fixtureDia: ComponentFixture<EditRecipeContentModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipeModule ],
      imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        HttpClient,
        HttpHandler,
        AuthService
      ]
    })
    .compileComponents();

    fixtureBtn = TestBed.createComponent(EditRecipeModule);
    componentBtn = fixtureBtn.componentInstance;
    fixtureBtn.detectChanges();

    fixtureDia = TestBed.createComponent(EditRecipeContentModule);
    componentDia = fixtureDia.componentInstance;
    fixtureDia.detectChanges();

  });


  it('should create EditRecipeModule', () => {
    expect(componentBtn).toBeTruthy();
  });

  it('should create EditRecipeContentModule', () => {
    expect(componentDia).toBeTruthy();
  });

  it('ERM contains a button "Edit recipe" to open dialog', () => {
    const buttonElement = fixtureBtn.debugElement.nativeElement.querySelector('#edit');
    expect(buttonElement.innerHTML).toBe('Edit recipe');
  });

  it('ERM opens the dialog upon button click', fakeAsync(() => {
    spyOn(componentBtn, "openDialog");

    let buttonElement = fixtureBtn.debugElement.query(By.css('#edit'));
    buttonElement.nativeElement.click();

    expect(componentBtn.openDialog).toHaveBeenCalled();
  }));
  it('ERCM calls editRecipe() when form is submitted', () => {
    let spy = spyOn(componentDia, "editRecipe");
    let btn = fixtureDia.debugElement.query(By.css('#submit'));
    btn.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

});




