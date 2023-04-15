import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthService } from '../shared/auth/auth.service';
import { requiredFileType } from './requireFileType';



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
      image: new FormControl('',Validators.required)
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
    console.log(this.imageName);
    console.log(this.imageString);
    await this.httpClient.post('/server/recipes/add',{
      image_name: this.imageName,
      ingredients: formatIngredientsForAPI(this.recipeForm.value['ingredients']),
      instructions: formatInstructionsForAPI(this.recipeForm.value['instructions']),
      title: this.recipeForm.value['title'],
      image: this.imageString,
      uid: parseInt(this.accountData)
    }).subscribe((post)=>{
      console.log("Recipe Added for User", this.accountData);

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
      this.recipeForm.patchValue({image: `${f.name}`});
      var reader = new FileReader();
      

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(f);
        //this.imageString = btoa(reader.result!.toString())
        //console.log(this.imageString)
      }
    } else {
      this.recipeForm.patchValue({image: ""});
    }
  }

  _handleReaderLoaded(f: any) {
    this.imageString = btoa(f.target.result);
           console.log(this.imageString);
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


