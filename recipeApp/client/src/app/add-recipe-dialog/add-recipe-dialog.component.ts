import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css']
})
export class AddRecipeDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddRecipeDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  titleFormControl = new FormControl('', [
    Validators.required,
    ]);
    ingredientsFormControl = new FormControl('', [
      Validators.required,
    ]);
    instructionsFormControl = new FormControl('', [
      Validators.required,
    ]);

}
