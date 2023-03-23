import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css']
})
export class AddRecipeDialogComponent {

  recipeForm!: FormGroup;
  @ViewChild(RecipesComponent) recipes: any;

  constructor(
    public dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    private httpClient: HttpClient
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
  }

  async addRecipe() {
    await this.httpClient.post('/server/recipes/add', {
      image_name: "test_image_1",
      ingredients: this.recipeForm.value['ingredients'],
      instructions: this.recipeForm.value['instructions'],
      title: this.recipeForm.value['title'],
    }).subscribe((post)=>{
      console.log("Recipe Added");
    });
  }

}
