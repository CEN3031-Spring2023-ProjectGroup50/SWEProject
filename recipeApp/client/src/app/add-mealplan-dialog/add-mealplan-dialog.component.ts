import { Component, ViewChild } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-add-mealplan-dialog',
  templateUrl: './add-mealplan-dialog.component.html',
  styleUrls: ['./add-mealplan-dialog.component.css']
})
export class AddMealplanDialogComponent {
  recipeForm!: FormGroup;
  @ViewChild(RecipesComponent) recipes: any;
  @ViewChild(RecipesComponent) accountData: any;

  mealtypes: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Other'];

  constructor(
    public dialogRef: MatDialogRef<AddMealplanDialogComponent>,
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
      //ingredients: formatIngredientsForAPI(this.recipeForm.value['ingredients']),
      //instructions: formatInstructionsForAPI(this.recipeForm.value['instructions']),
      title: this.recipeForm.value['title'],
      uid: parseInt(this.accountData)
    }).subscribe((post)=>{
      console.log("Recipe Added for User", this.accountData);
    });
  }
}
