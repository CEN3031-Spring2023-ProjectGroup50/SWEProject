import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { colors } from './colors';
import { CalendarHeaderComponent } from './calendar-header.component';

interface userMeals {
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
export class MealPlanComponent {

  @Input() calendarHeader!: CalendarHeaderComponent;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  view: CalendarView = CalendarView.Week;
  
  viewDate: Date = new Date();

  accountData="0"
  uid = 0
  defaultAccount = "0"
  public userMeals: userMeals[] | undefined = []
  public events: CalendarEvent[]

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private sharedService: SharedFunctionsService,
  ){
    this.sharedService.getReloadResponse().subscribe(()=>{

      });
  }

  async ngOnInit() {
    this.loadMeals();
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

    
    
  async loadMeals() {

    this.authService.getAccount().subscribe(
      (res: any) => {
          this.accountData = res.toString();
          this.uid = parseInt(this.accountData);
          console.log("UID from auth service = " + this.uid)
      }
    );
    console.log("ViewDate = " + this.viewDate);


    console.log("UID in loadMeals = " + this.uid.toString())

    let URL = `/server/meals/bydate`;

    let params = new HttpParams()
    params = params.append('date', "2023-04-09") // this.calendarHeader.getSunday())
    params = params.append('uid', "8")

    this.userMeals = await this.httpClient.get<userMeals[]>(URL, { params: params }).toPromise();

    console.log(this.userMeals)

  }


  }
  