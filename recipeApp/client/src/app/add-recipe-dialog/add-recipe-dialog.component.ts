import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css']
})
export class AddRecipeDialogComponent {

  recipeForm!: FormGroup;

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

    })
  }

}
