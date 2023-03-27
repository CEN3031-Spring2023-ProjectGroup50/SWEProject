import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css']
})
export class AddRecipeDialogComponent {

  recipeForm!: FormGroup;
  @ViewChild(RecipesComponent) recipes: any;
  @ViewChild(RecipesComponent) accountData: any;

  constructor(
    public dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    private httpClient: HttpClient,
    private authService: AuthService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      title: new FormControl(''),
      ingredients: new FormControl(''),
      instructions: new FormControl(''),
    })
    this.recipeForm.valueChanges.subscribe();
    this.authService.getAccount().subscribe(
      (res: any) => {
          this.accountData = res.toString();
      },
      (error: any) => {
        this.dialogRef.close();
      })
  }

  async addRecipe() {
    await this.httpClient.post('/server/recipes/add', {
      image_name: "test_image_1",
      ingredients: formatIngredientsForAPI(this.recipeForm.value['ingredients']),
      instructions: formatInstructionsForAPI(this.recipeForm.value['instructions']),
      title: this.recipeForm.value['title'],
      uid: parseInt(this.accountData)
    }).subscribe((post)=>{
      console.log("Recipe Added for User", this.accountData);
    });
  }

}

function formatIngredientsForAPI(Ingredients: string,) {
  let result = "['";
  result = result.concat(Ingredients.replaceAll("\n", "\', \'"));
  result = result.concat("']");
  return result;
}

function formatInstructionsForAPI(Instructions: string,) {
  return Instructions.replaceAll("\n\n", "\n");
}
