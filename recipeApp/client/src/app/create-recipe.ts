import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  ingredients: string;
  directions: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'create-recipe',
  templateUrl: 'create-recipe.html',
  styleUrls: ['./app.component.css']
})
export class CreateRecipe {
  title!: string;
  ingredients!: string;
  directions!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRecipeDialog, {
      data: {title: this.title, ingredients: this.ingredients, directions: this.directions},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result;
    });
  }
}

@Component({
  selector: 'create-recipe',
  templateUrl: 'create-recipe-dialog.html',
})
export class CreateRecipeDialog {
  constructor(
    public dialogRef: MatDialogRef<CreateRecipeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
