import {Component, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface IRecipeItem {
  Rid: number,
  Title: string,
  Ingredients: string,
  Instructions: string,
  Image_name: string,
  Uid: number,
  Image: Uint8Array[],
}

@Component({
  selector: 'recipe-details',
  templateUrl: 'recipe-details.component.html',
})

export class RecipeDetailsModule {

  @Input() recipe: IRecipeItem;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(RecipeDetailsContentModule, {
      data: {
        rID: this.recipe.Rid,
        Title: this.recipe.Title,
        Ingredients: formatIngredients(this.recipe.Ingredients),
        Instructions: formatInstructions(this.recipe.Instructions),
        Image_name: this.recipe.Image_name,
        Uid: this.recipe.Uid,
        Image: this.recipe.Image,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'recipe-details-content',
  templateUrl: 'recipe-details-content.component.html',
  styleUrls: ['./recipe-details.component.css']

})
export class RecipeDetailsContentModule {

  constructor(@Inject(MAT_DIALOG_DATA) public recipe: any) {}

}

function formatIngredients(Ingredients: string,) {
  let result = Ingredients.substring(2, Ingredients.length-2);
  result = result.replaceAll("\', \'" , "\n");
  return result;
}

function formatInstructions(Instructions: string,) {
  return Instructions.replaceAll("\n", "\n\n");
}