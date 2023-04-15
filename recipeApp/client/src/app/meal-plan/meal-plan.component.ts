import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { colors } from './colors';
import {OnInit, AfterViewInit} from '@angular/core';
import { CalendarHeaderComponent } from './calendar-header.component';
import { Subject } from 'rxjs';


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
    private changeDetectorRef: ChangeDetectorRef
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
        start: d,
        title: meal.Title,
        color: mealColor,
        allDay: true,
      }
      this.events.push(mealEvent)
    }

    return this.events
  }


  }
  