import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddRecipeDialogComponent } from './add-recipe-dialog.component';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AddRecipeDialogModule', () => {
  let component: AddRecipeDialogComponent;
  let fixture: ComponentFixture<AddRecipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        HttpClient,
        HttpHandler,
        AuthService
      ],
      imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
  it('submitting form calls addRecipe()', () => {
    let spy = spyOn(component, "addRecipe");
    let form = fixture.debugElement.query(By.css('#form'));

    form.triggerEventHandler('submit', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
  it('clicking Cancel calls onNoClick() (closes the dialog)', () => {
    let spy = spyOn(component, "onNoClick");
    let btn = fixture.debugElement.query(By.css('#cancel'));
    btn.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

});
