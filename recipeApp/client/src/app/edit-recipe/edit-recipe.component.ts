import {Component, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http'
import {AuthService} from '../shared/auth/auth.service'

interface IRecipeItem {
  Rid: number,
  Title: string,
  Ingredients: string,
  Instructions: string,
  Image_name: string,
  Uid: number,
  Email: string,
  Image: Uint8Array[],

}

@Component({
  selector: 'edit-recipe',
  templateUrl: 'edit-recipe.component.html',
})

export class EditRecipeModule {

  @Input() recipe: IRecipeItem;
  loading = false;
  postId = null;
  errorMessage = null;

  constructor(public dialog: MatDialog,
      private httpClient: HttpClient,
      private authService: AuthService) {}

  openDialog() {
    const dialogRef = this.dialog.open(EditRecipeContentModule, {
      data: {
        rID: this.recipe.Rid,
        Title: this.recipe.Title,
        Ingredients: formatIngredients(this.recipe.Ingredients),
        Instructions: formatInstructions(this.recipe.Instructions),
        Image_name: this.recipe.Image_name,
        Uid: this.recipe.Uid,
        Email: this.recipe.Email,
        Image: this.recipe.Image,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async editRecipe() {

    this.syncChanges();

    this.loading = true;

    let URL = `/server/recipes/edit`

    this.httpClient.put<any>(URL, {
      Rid: this.recipe.Rid,
      Title: this.recipe.Title,
      Ingredients: this.recipe.Ingredients,
      Instructions: this.recipe.Instructions,
      Image_Name: this.recipe.Image_name,
      Uid: this.recipe.Uid,
    })
      .subscribe({
        next: data => {
          this.postId = data.id;
          this.loading = false;
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });    
    }

    syncChanges(){

    }


}


@Component({
  selector: 'edit-recipe-content',
  templateUrl: 'edit-recipe-content.component.html',
  styleUrls: ['./edit-recipe.component.css']

})
export class EditRecipeContentModule {

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