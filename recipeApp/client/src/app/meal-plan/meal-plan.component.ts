import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { colors } from './colors';

@Component({
  selector: 'app-meal-plan',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-plan.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./meal-plan.component.css'],

})
export class MealPlanComponent {

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  view: CalendarView = CalendarView.Week;
  
  viewDate: Date = new Date();

  accountData="0"
  uid = 0

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private sharedService: SharedFunctionsService,
  ){
    this.sharedService.getReloadResponse().subscribe(()=>{

      });
  }

  async ngOnInit() {
    this.authService.getAccount().subscribe(
      (res: any) => {
          this.accountData = res.toString();
          this.uid = parseInt(this.accountData);
          console.log("UID = " + this.uid)
      }
    );
    console.log("ViewDate = " + this.viewDate);
  }
  
    events: CalendarEvent[] = [
      {
        start: startOfDay(new Date()),
        title: 'An event',
        color: colors.yellow,
        allDay: true,
      },
      {
        start: startOfDay(new Date()),
        title: 'An event',
        color: colors.blue,
        allDay: true,
      },
      {
        start: startOfDay(new Date()),
        title: 'An event',
        color: colors.red,
        allDay: true,
      },
      {
        start: addDays(startOfDay(new Date()), 2),
        title: 'An event',
        color: colors.gray,
        allDay: true,
      },

    ];

  }
  