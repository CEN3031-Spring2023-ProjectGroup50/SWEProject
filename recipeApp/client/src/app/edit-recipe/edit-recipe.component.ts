import {Component, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http'
import {AuthService} from '../shared/auth/auth.service'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'


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

  constructor(public dialog: MatDialog) {}

  openDialog() {

    const dialogRef = this.dialog.open(EditRecipeContentModule, {
      data: {
        Rid: this.recipe.Rid,
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
      window.location.reload(); // This is a temporary solution until we can get it to refresh on the current page
    });
  }

}


@Component({
  selector: 'edit-recipe-content',
  templateUrl: 'edit-recipe-content.component.html',
  styleUrls: ['./edit-recipe.component.css']

})
export class EditRecipeContentModule {

  loading = false;
  postId = 0;
  errorMessage = "";
  editRecipeForm!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public recipe: IRecipeItem,
      private httpClient: HttpClient,
      private authService: AuthService,
      private formBuilder: FormBuilder,) {}
  
  ngOnInit() {

    this.editRecipeForm = new FormGroup({
      title: new FormControl(this.recipe.Title),
      ingredients: new FormControl(this.recipe.Ingredients),
      instructions: new FormControl(this.recipe.Instructions)
    })
    this.editRecipeForm.valueChanges.subscribe(() =>
      this.errorMessage = '')
  }

  async editRecipe() {

    console.log(this.recipe);

    this.loading = true;

    let RidString = this.recipe.Rid.toString();

    // 13512 is a hardcoded Rid for testing API. 
    // Trying to figure out how to pass in the recipe data using ${this.recipe.Rid} without it being undefined.
    let URL = `/server/recipes/edit/${RidString}`

    await this.httpClient.put(URL, {
      Rid: this.recipe.Rid,
      Title: this.editRecipeForm.value['title'],
      Ingredients: formatIngredientsForAPI(this.editRecipeForm.value['ingredients']),
      Instructions: formatInstructionsForAPI(this.editRecipeForm.value['instructions']),
      Image_Name: this.recipe.Image_name,
      Uid: this.recipe.Uid,
    })
      .subscribe({
        next: data => {
          this.loading = false;
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });    
    }
}

function formatIngredients(Ingredients: string,) {
  let result = Ingredients.substring(2, Ingredients.length-2);
  result = result.replaceAll("\', \'" , "\n");
  return result;
}

function formatInstructions(Instructions: string,) {
  return Instructions.replaceAll("\n", "\n\n");
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