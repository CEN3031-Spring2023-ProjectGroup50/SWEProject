import { WeekDay } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { yearsPerRow } from '@angular/material/datepicker';
import { end } from '@popperjs/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'mwl-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ["../../../node_modules/bootstrap/dist/css/bootstrap.min.css", './meal-plan.component.css'],
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView;
  @Input() viewDate: Date;
  @Input() locale: string = 'en';
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;

  async ngOnInit() {
    this.getSunday();
  }

  async getSunday() {
    console.log("ViewDate = " + this.viewDate.toDateString());
    // console.log("Random Hard Coded Date = " + new Date("2023-09-14"));
    
    let today = this.viewDate.toDateString().substring(0,3);
    // console.log("today = " + today);
    
    let sunday: Date = this.viewDate;
    if (today == "Sun"){
      // do nothing
    }
    if (today == "Mon"){
      sunday.setDate(sunday.getDate() - 1);
    }
    if (today == "Tue"){
      sunday.setDate(sunday.getDate() - 2);
    }
    if (today == "Wed"){
      sunday.setDate(sunday.getDate() - 3);
    }
    if (today == "Thu"){
      sunday.setDate(sunday.getDate() - 4);
    }
    if (today == "Fri"){
      sunday.setDate(sunday.getDate() - 5);
    }
    if (today == "Sat"){
      sunday.setDate(sunday.getDate() - 6);
    }
    console.log("Sunday = " + sunday);
    
    var day, month, yearNum, monthNum, dayNum = "";

    month = sunday.toDateString().substring(4,7);
    yearNum = sunday.toDateString().substring(11, 15);
    monthNum = "";
    dayNum = sunday.toDateString().substring(8, 10);

    switch (month) {
      case "Jan":
        monthNum = "01"
        break;
      case "Feb":
        monthNum = "02"
        break;
      case "Mar":
        monthNum = "03"
        break;
      case "Apr":
        monthNum = "04"
        break;
      case "May":
        monthNum = "05"
        break;
      case "Jun":
        monthNum = "06"
        break;
      case "Jul":
        monthNum = "07"
        break;
      case "Aug":
        monthNum = "08"
        break;
      case "Sep":
        monthNum = "09"
        break;
      case "Oct":
        monthNum = "10"
        break;
      case "Nov":
        monthNum = "11"
        break;
      case "Dec":
        monthNum = "12"
        break;
      default:
        monthNum = "00" 
        break;
   }

   var dateForAPI = yearNum + "-" + monthNum + "-" + dayNum

    // console.log("sunday's monthName = " + month);
    // console.log("sunday's yearNum = " + yearNum);
    // console.log("sunday's monthNum = " + monthNum);
    // console.log("sunday's dayNum = " + dayNum);
    console.log("dateForAPI = " + dateForAPI);

    return dateForAPI;
   }
}
