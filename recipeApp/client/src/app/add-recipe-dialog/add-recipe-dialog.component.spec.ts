import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AddRecipeDialogComponent } from './add-recipe-dialog.component';

describe('AddRecipeDialogComponent', () => {
  let component: AddRecipeDialogComponent;
  let fixture: ComponentFixture<AddRecipeDialogComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeDialogComponent ],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}}]
    })
    .compileComponents();

    dialog = TestBed.get(MatDialog);
    fixture = TestBed.createComponent(AddRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    dialog.open(AddRecipeDialogComponent);
    fixture.detectChanges();
  });
});
