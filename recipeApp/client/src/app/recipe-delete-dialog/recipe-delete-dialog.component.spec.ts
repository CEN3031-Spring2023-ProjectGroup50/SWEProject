import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecipeDeleteDialogComponent, RecipeDeleteDialogContent } from './recipe-delete-dialog.component';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RecipeDeleteDialogModule', () => {
  let componentBtn: RecipeDeleteDialogComponent;
  let fixtureBtn: ComponentFixture<RecipeDeleteDialogComponent>;
  let componentContent: RecipeDeleteDialogContent;
  let fixtureContent: ComponentFixture<RecipeDeleteDialogContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDeleteDialogComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        HttpClient,
        HttpHandler,
        AuthService],
      imports: [
          MatInputModule,
          MatDialogModule,
          BrowserAnimationsModule,
          MatButtonModule,
          MatSnackBarModule
        ]
    })
    .compileComponents();

    fixtureBtn = TestBed.createComponent(RecipeDeleteDialogComponent);
    componentBtn = fixtureBtn.componentInstance;
    fixtureBtn.detectChanges();

    fixtureContent = TestBed.createComponent(RecipeDeleteDialogContent);
    componentContent = fixtureContent.componentInstance;
    fixtureContent.detectChanges();
  });

  it('should create Recipe Delete Dialog Component (Button)', () => {
    expect(componentBtn).toBeTruthy();
  });
  it('should create Recipe Delete Dialog Content Component (Dialog)', () => {
    expect(componentContent).toBeTruthy();
  });

  it('clicking the Button opens the dialog', () => {
    let spy = spyOn(componentBtn, "openDialog");
    let button = fixtureBtn.debugElement.query(By.css('#deleteDia'));
    button.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('clicking "Yes, Delete this Recipe" calls deleteRecipe()', () => {
    let spy = spyOn(componentContent, "deleteRecipe");
    let button = fixtureContent.debugElement.query(By.css('#delete'));
    button.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

});
