import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectorRef, Inject} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { colors } from './colors';
import {OnInit, AfterViewInit} from '@angular/core';
import { CalendarHeaderComponent } from './calendar-header.component';
import { Subject } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms'

interface userMeal {
  Mid: number,
  Date: Date,
  Mealtype: string,
  Title: string,
  Ingredients: string,
  Instructions: string,
  Image_name: string,
  Email: string,
  Image: Uint8Array[],
}

@Component({
  selector: 'app-meal-plan',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './meal-plan.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./meal-plan.component.css'],

})
export class MealPlanComponent implements OnInit, AfterViewInit {

  refreshCalendar: Subject<void> = new Subject();
  @ViewChild(CalendarHeaderComponent) calendar: CalendarHeaderComponent;
  @Input() locale: string = 'en';
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  getSun: string;
  accountData="0"
  uid = 0
  defaultAccount = "0"
  public userMeals: userMeal[] | undefined = []
  public events: CalendarEvent[] = []

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private sharedService: SharedFunctionsService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ){
    this.sharedService.getReloadResponse().subscribe(()=>{
      
      });
  }

  async ngOnInit() {
    this.getAccountData()
    await this.loadMeals()
    console.log(this.accountData)

    this.sharedService.aClickedEvent
    .subscribe((data:string) => {
      console.log('Event message from Calendar Header: ' + data);
      this.ngAfterViewInit();
      this.changeDetectorRef.detectChanges();
      this.refreshCalendar.next();

      console.log("events")
      console.log(this.events)
      console.log("userMeals")
      console.log(this.userMeals)
    });
  }

  async ngAfterViewInit() {
    this.getSun = await this.calendar.getSunday();
    console.log("getSun = " + this.getSun);
    this.loadMeals();
  }
    
  async loadMeals() {

    this.accountData = await this.getAccountData()

    let URL = `/server/meals/bydate`;

    let params = new HttpParams()
    params = params.append('date', this.getSun)
    params = params.append('uid', this.uid.toString())

    this.userMeals = await this.httpClient.get<userMeal[]>(URL, { params: params }).toPromise()

    if (this.userMeals?.length != 0) {this.events = this.convertToEvents(this.userMeals)}

    return this.events
  }

  async getAccountData(){
     this.authService.getAccount().subscribe(
      (res: any) => {
          this.accountData = res.toString();
          this.uid = parseInt(this.accountData);
      }
    );
    await this.authService.getAccount().toPromise();
    return this.accountData
  }

  convertToEvents(meals: userMeal[]|undefined){

    this.events = [] // clear prev list

    for (let meal of meals!) {
      
      let mealEvent: CalendarEvent;

      let mealColor = colors.Other;
      if (meal.Mealtype == "Breakfast") {mealColor = colors.Breakfast}
      else if (meal.Mealtype == "Lunch") {mealColor = colors.Lunch}
      else if (meal.Mealtype == "Dinner") {mealColor = colors.Dinner}
      else {let mealColor = colors.Other}

      var d = new Date(meal.Date.toString());
      d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );

      mealEvent = 
      {
        id: meal.Mid,
        start: d,
        title: meal.Title,
        color: mealColor,
        allDay: true,
      }
      this.events.push(mealEvent)
    }

    return this.events
  }


  @Input() clickedMeal: userMeal
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);

    this.clickedMeal = this.userMeals?.find(meal => meal.Mid === event.id)!;
    console.log("meal clicked: ")
    console.log(this.clickedMeal)

    this.openDialog()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MealDialog, {
      data: {
        Mid: this.clickedMeal.Mid,
        Date: this.clickedMeal.Date,
        Mealtype: this.clickedMeal.Mealtype,
        Title: this.clickedMeal.Title,
        Ingredients: formatIngredients(this.clickedMeal.Ingredients),
        Instructions: formatInstructions(this.clickedMeal.Instructions),
        Image_name: this.clickedMeal.Image_name,
        Email: this.clickedMeal.Email,
        Image: this.clickedMeal.Image,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  }
  

  @Component({
    selector: 'meal-details-dialog',
    templateUrl: 'meal-details.html',
  })
  export class MealDialog {
    constructor(
      public dialogRef: MatDialogRef<MealPlanComponent>,
      @Inject(MAT_DIALOG_DATA) public meal: userMeal,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
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