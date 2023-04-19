import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthService } from '../shared/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SharedFunctionsService } from '../shared/shared-functions.service'


@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css']
})
export class AddRecipeDialogComponent {

  recipeForm!: FormGroup;
  @ViewChild(RecipesComponent) recipes: any;
  @ViewChild(RecipesComponent) accountData: any;
  file_store: FileList;
  file_list: Array<string> = [] ;
  error: string = "";
  imageString: string;
  imageName: string;

  constructor(
    public dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    private httpClient: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private sharedService: SharedFunctionsService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      title: new FormControl(''),
      ingredients: new FormControl(''),
      instructions: new FormControl(''),
      image: new FormControl('')
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
    await this.httpClient.post('/server/recipes/add',{
      image_name: this.imageName,
      ingredients: formatIngredientsForAPI(this.recipeForm.value['ingredients']),
      instructions: formatInstructionsForAPI(this.recipeForm.value['instructions']),
      title: this.recipeForm.value['title'],
      image: this.imageString,
      uid: parseInt(this.accountData)
    }).subscribe((post)=>{
      console.log("Recipe Added for User", this.accountData);
      this.sharedService.reload();
      this._snackBar.open("Recipe successfully added!", "", {duration: 2000});
    });
  }

  handleFileInputChange(l: FileList ): void | null {
    this.error = "";
    this.file_store = l;
    if (l.length) {      
      if (l.length > 1) this.error = "Only one file at time allowed";
      else{
      const f = l[0];
      this.imageName = f.name;
      var extension = f.name.split('.')[1].toLowerCase();
      if (extension!="jpg") this.error = "Only .jpg files allowed";
      this.recipeForm.patchValue({image: `${f.name}`});
      var reader = new FileReader();
      

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(f);
      }
    } else {
      this.recipeForm.patchValue({image: ""});
    }
  }

  _handleReaderLoaded(f: any) {
    this.imageString = btoa(f.target.result);
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


