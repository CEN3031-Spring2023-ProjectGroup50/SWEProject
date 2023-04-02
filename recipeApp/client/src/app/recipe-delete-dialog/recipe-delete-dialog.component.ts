import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthService } from '../shared/auth/auth.service';


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
  selector: 'app-recipe-delete-dialog',
  templateUrl: './recipe-delete-dialog.component.html',
  styleUrls: ['./recipe-delete-dialog.component.css']
})
export class RecipeDeleteDialogComponent {

  @Input() recipe: IRecipeItem;

  constructor(public dialog: MatDialog,
    private httpClient: HttpClient,
    private authService: AuthService) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(RecipeDeleteDialogContent, {
      data: {
        Rid: this.recipe.Rid
      }
    });
  }

  async deleteRecipe() {
    let RidString = this.recipe.Rid.toString();
    let URL = `/server/recipes/delete/${RidString}`

    await this.httpClient.put(URL, {Rid: this.recipe.Rid})
      .subscribe({
        next: data=>{
          console.log('Recipe Deleted');
        },
        error: error=>{
          console.log('Delete Failed')
        }
      })
  }


}

@Component({
  selector: 'recipe-delete-dialog-content',
  templateUrl: 'recipe-delete-dialog-content.component.html'
})

export class RecipeDeleteDialogContent {}
