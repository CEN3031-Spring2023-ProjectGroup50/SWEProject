import { Component, Input, Inject, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup,FormControl,Validators, FormGroupDirective } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { AuthService } from '../shared/auth/auth.service';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  selector: 'add-mealplan-dialog',
  templateUrl: './add-mealplan-dialog.component.html',
  //styleUrls: ['./add-mealplan-dialog.component.css']
})
export class AddMealplanDialogComponent {
  @Input() recipe: IRecipeItem;

  constructor(public dialog: MatDialog) {}

  openDialog() {

    const dialogRef = this.dialog.open(AddMealplanContentComponent, {
      data: {
        Rid: this.recipe.Rid,
        Title: this.recipe.Title,
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    //condition true
    const isSubmitted = form && form.submitted;
    //false
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'add-mealplan-dialog-content',
  templateUrl: './add-mealplan-dialog-content.component.html',
  styleUrls: ['./add-mealplan-dialog.component.css']
})
export class AddMealplanContentComponent {
  mealForm!: FormGroup;
  currentDate: Date;
  accountData: string;
  matcher: ErrorStateMatcher;

  mealtypes: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Other'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: IRecipeItem,
    public dialogRef: MatDialogRef<AddMealplanDialogComponent>,
    private httpClient: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.mealForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      mealtype: new FormControl('', [Validators.required]),
    })
    this.matcher = new MyErrorStateMatcher();
    this.mealForm.valueChanges.subscribe();
    this.authService.getAccount().subscribe(
      (res: any) => {
          this.accountData = res.toString();
      },
      (error: any) => {
        this.dialogRef.close();
      })
  }

  async addToMeal() {
    await this.httpClient.post('/server/meals/add', {
      userid: parseInt(this.accountData),
      recipeid: this.recipe.Rid,
      date: new DatePipe('en-US').transform(this.mealForm.value['date'], 'yyyy-MM-dd'),
      mealtype: this.mealForm.value['mealtype']
    }).subscribe((post)=>{
      console.log("Recipe Added To Meal For User", this.accountData);
      this._snackBar.open("Meal successfully added to meal plan!", "", {duration: 2000});
    });
  }
}
