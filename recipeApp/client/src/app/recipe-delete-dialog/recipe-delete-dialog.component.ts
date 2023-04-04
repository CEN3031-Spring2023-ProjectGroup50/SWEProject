import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(RecipeDeleteDialogContent, {
      data: {
        Rid: this.recipe.Rid
      }
    });
  }
}

@Component({
  selector: 'recipe-delete-dialog-content',
  templateUrl: 'recipe-delete-dialog-content.component.html'
})

export class RecipeDeleteDialogContent {


  constructor(@Inject(MAT_DIALOG_DATA) public recipe: IRecipeItem,
      private httpClient: HttpClient,
      private authService: AuthService){}


  async deleteRecipe() {
    let Rid = this.recipe.Rid;
    let URL = `/server/recipes/delete/${Rid}`

    await this.httpClient.delete(URL)
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
