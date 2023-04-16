import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import {OnInit, AfterViewInit} from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarHeaderGroceryComponent } from './calendar-header-grocery.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],

})
export class GroceryListComponent {
  refreshCalendar: Subject<void> = new Subject();

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  public events: CalendarEvent[] = []
}