import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
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

  view: CalendarView = CalendarView.Week;
  
    viewDate: Date = new Date();
  
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
        color: colors.yellow,
        allDay: true,
      },
      {
        start: startOfDay(new Date()),
        title: 'An event',
        color: colors.yellow,
        allDay: true,
      },
      {
        start: addDays(startOfDay(new Date()), 2),
        title: 'An event',
        color: colors.yellow,
        allDay: true,
      },

    ];

  }
  