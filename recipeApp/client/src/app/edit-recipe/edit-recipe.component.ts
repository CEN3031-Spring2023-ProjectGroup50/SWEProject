import {Component, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http'
import {AuthService} from '../shared/auth/auth.service'
import { SharedFunctionsService } from '../shared/shared-functions.service';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms'


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

  constructor(public dialog: MatDialog, public sharedService: SharedFunctionsService) {}

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

  imageName = this.recipe.Image_name;
  imageString = this.recipe.Image.toString() // I tried this too with no luck: new TextDecoder().decode(this.recipe.Image)
  file_store: FileList;
  file_list: Array<string> = [] ;
  error: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public recipe: IRecipeItem,
      private httpClient: HttpClient,
      private authService: AuthService,
      private sharedService: SharedFunctionsService,
      private formBuilder: FormBuilder,) {}
  
  ngOnInit() {

    this.editRecipeForm = new FormGroup({
      title: new FormControl(this.recipe.Title),
      image: new FormControl(this.recipe.Image),
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

    let URL = `/server/recipes/edit/${RidString}`

    console.log("imageName = " + this.imageName);
    console.log("imageString = " + this.imageString);
    await this.httpClient.put(URL, {
      Rid: this.recipe.Rid,
      Title: this.editRecipeForm.value['title'],
      Ingredients: formatIngredientsForAPI(this.editRecipeForm.value['ingredients']),
      Instructions: formatInstructionsForAPI(this.editRecipeForm.value['instructions']),
      Image_Name: this.imageName,
      Uid: this.recipe.Uid,
      Image: btoa(this.imageString)
    })
      .subscribe({
        next: data => {
          this.loading = false;
          this.sharedService.reload();
          console.log("Recipe Edited for User", this.recipe.Uid);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });    
    }

    handleFileInputChange(l: FileList ): void | null {
      this.error = "";
      this.file_store = l;
      if (l.length) {
        console.log(l.length)
  
        if (l.length > 1) this.error = "Only one file at time allowed";
        else{
        const f = l[0];
        this.imageName = f.name;
        var extension = f.name.split('.')[1].toLowerCase();
        if (extension!="jpg") this.error = "Only .jpg files allowed";
        this.editRecipeForm.patchValue({image: `${f.name}`});
        var reader = new FileReader();
    
          reader.onload =this._handleReaderLoaded.bind(this);
  
          reader.readAsBinaryString(f);
          //this.imageString = btoa(reader.result!.toString())
          //console.log(this.imageString)
        }
      } else {
        this.editRecipeForm.patchValue({image: ""});
      }
    }
  
    _handleReaderLoaded(f: any) {
      this.imageString = btoa(f.target.result);
      //console.log(this.imageString);
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

