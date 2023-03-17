import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'recipe-details',
  templateUrl: 'recipe-details.component.html',
})
export class RecipeDetailsModule {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(RecipeDetailsContentModule);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    // If you want to share data with your dialog, you can use the data option to pass information to the dialog component.
    // let dialogRef = dialog.open(YourDialog, {
    //     data: { name: 'austin' },
    //   });
  }
}

@Component({
  selector: 'recipe-details-content',
  templateUrl: 'recipe-details-content.component.html',
  styleUrls: ['./recipe-details.component.css']

})
export class RecipeDetailsContentModule {}