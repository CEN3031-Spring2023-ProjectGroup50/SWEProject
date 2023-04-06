import { Component, Input, Inject, ViewChild } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { AuthService } from '../shared/auth/auth.service';
import { DatePipe } from '@angular/common';

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

@Component({
  selector: 'add-mealplan-dialog-content',
  templateUrl: './add-mealplan-dialog-content.component.html',
  styleUrls: ['./add-mealplan-dialog.component.css']
})
export class AddMealplanContentComponent {
  mealForm!: FormGroup;
  currentDate: Date;
  accountData: string;

  mealtypes: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Other'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: IRecipeItem,
    public dialogRef: MatDialogRef<AddMealplanDialogComponent>,
    private httpClient: HttpClient,
    private authService: AuthService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.mealForm = new FormGroup({
      date: new FormControl(''),
      mealtype: new FormControl(''),
    })
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
      date: this.mealForm.value['date'],
      mealtype: this.mealForm.value['mealtype']
    }).subscribe((post)=>{
      console.log("Recipe Added To Meal For User", this.accountData);
    });
  }
}
