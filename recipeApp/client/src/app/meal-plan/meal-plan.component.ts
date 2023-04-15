import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { colors } from './colors';
import {OnInit, AfterViewInit} from '@angular/core';
import { CalendarHeaderComponent } from './calendar-header.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-plan.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./meal-plan.component.css'],

})
export class MealPlanComponent implements OnInit, AfterViewInit {

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
  ){
    this.sharedService.getReloadResponse().subscribe(()=>{
      this.loadMeals();
      this.convertToEvents(this.userMeals);
      });
  }

  async ngOnInit() {
    console.log("ViewDate = " + this.viewDate);
    this.getAccountData()
    await this.loadMeals()
    console.log(this.accountData)
    console.log("events" + this.events)
  }

  async ngAfterViewInit() {
    this.getSun = await this.calendar.getSunday();
    console.log("getSun = " + this.getSun);
  }
  
    // events: CalendarEvent[] = [
    //   {
    //     start: startOfDay(new Date()),
    //     title: 'Meal title',
    //     color: colors.Breakfast,
    //     allDay: true,
    //   },
    //   {
    //     start: startOfDay(new Date()),
    //     title: 'An event',
    //     color: colors.Lunch,
    //     allDay: true,
    //   },
    //   {
    //     start: startOfDay(new Date()),
    //     title: 'An event',
    //     color: colors.Dinner,
    //     allDay: true,
    //   },
    //   {
    //     start: addDays(startOfDay(new Date()), 2),
    //     title: 'An event',
    //     color: colors.Other,
    //     allDay: true,
    //   },

    // ];


  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private sharedService: SharedFunctionsService,
  ){
    this.sharedService.getReloadResponse().subscribe(()=>{
      this.loadMeals();
      });
  }

  ngOnInit() {
    console.log("_________ngOnInit IS RUNNING_________");
    console.log("ViewDate = " + this.viewDate);
    this.getAccountData();
  }

  async ngAfterViewInit() {
    console.log("_________ngAfterViewInit IS RUNNING_________");
    this.getSun = await this.calendar.getSunday();
    console.log("getSun = " + this.getSun);
    this.loadMeals();
  }  
    
  async loadMeals() {

    this.getAccountData()

    console.log("UID after calling loadMeals = " + this.uid.toString())
    console.log("accountData after calling loadMeals = " + this.accountData.toString())

    let URL = `/server/meals/bydate`;

    let params = new HttpParams()
    params = params.append('date', this.getSun)
    params = params.append('uid', "8")

    this.userMeals = await this.httpClient.get<userMeal[]>(URL, { params: params }).toPromise()

    console.log("user meals in loadMeals")
    console.log(this.userMeals)

    if (this.userMeals?.length != 0) {this.convertToEvents()}

    
  }

  getAccountData(){
    this.authService.getAccount().subscribe(
      (res: any) => {
          this.accountData = res.toString();
          this.uid = parseInt(this.accountData);
          console.log("UID after calling auth service = " + this.uid)
          return res.toString();
      }
    );
    console.log("ViewDate = " + this.viewDate);
  }

  convertToEvents(meals: userMeal[]|undefined){
    //localEvents: CalendarEvent[]
    console.log("user meals in convertToEvents")
    console.log(meals)

    for (let meal of meals!) {
      
      let mealEvent: CalendarEvent;

      let mealColor = colors.Other;
      if (meal.Mealtype == "Breakfast") {mealColor = colors.Breakfast}
      else if (meal.Mealtype == "Lunch") {mealColor = colors.Lunch}
      else if (meal.Mealtype == "Dinner") {mealColor = colors.Dinner}
      else {let mealColor = colors.Other}

      mealEvent = 
      {
        start: meal.Date,
        title: meal.Title,
        color: mealColor,
        allDay: true,
      }
      this.events.push(mealEvent)

      console.log("events in convertToEvents")

      console.log(this.events)
    }

    return this.events
  }


  }
  