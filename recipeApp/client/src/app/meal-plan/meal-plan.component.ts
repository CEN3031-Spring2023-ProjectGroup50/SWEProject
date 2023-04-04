import { Component, ViewChild} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';

import { setOptions, MbscCalendarEvent, MbscEventcalendarView  } from '@mobiscroll/angular';

setOptions({
  theme: 'ios',
  themeVariant: 'light',
  clickToCreate: false,
  dragToCreate: false,
  dragToMove: false,
  dragToResize: false,
  eventDelete: false
});

const now = new Date();
const day = now.getDay();
const monday = now.getDate() - day + (day == 0 ? -6 : 1);

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css'],

})
export class MealPlanComponent {

  myEvents: MbscCalendarEvent[] = [

    {
      start: new Date(now.getFullYear(), now.getMonth(), monday),
      title: 'Coffee',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday),
      title: 'Cereal',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 1),
      title: 'Coffee',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 1),
      title: 'Eggs',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
      title: 'Orange juice',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 3),
      title: 'Coffee',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 3),
      title: 'Omelet',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 4),
      title: 'pancakes',
      color: '#e7b300',
      allDay: true,
      meal: "breakfast"
    }, 


    {
      start: new Date(now.getFullYear(), now.getMonth(), monday),
      title: 'Pizza',
      color: '#00ca10',
      allDay: true,
      meal: "lunch"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 1),
      title: 'Pasta',
      color: '#00ca10',
      allDay: true,
      meal: "lunch"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
      title: 'Sub',
      color: '#00ca10',
      allDay: true,
      meal: "lunch"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 3),
      title: 'Sandwich',
      color: '#00ca10',
      allDay: true,
      meal: "lunch"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 4),
      title: 'Soup',
      color: '#00ca10',
      allDay: true,
      meal: "lunch"
    }, 
    {
      start: new Date(now.getFullYear(), now.getMonth(), monday + 4),
      title: 'Sode',
      color: '#00ca10',
      allDay: true,
      meal: "lunch"
    }, 

    
    
// SAMPLE CALENDAR EVENTS
/*
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday),
    title: 'Kate OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday),
    title: 'John OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday),
    title: 'Mark OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday),
    title: 'Emma OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 1),
    title: 'Mark OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 1),
    title: 'Carol OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
    title: 'Luke OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
    title: 'Carol OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
    title: 'Kate OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
    title: 'Dean OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
    title: 'Emma OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 2),
    title: 'Jason OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 3),
    title: 'Jason OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 4),
    title: 'Ryan OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 4),
    title: 'John OFF (APPROVED)',
    color: '#00ca10',
    allDay: true,
    accepted: true
  }, 
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 4),
    title: 'Dean OFF (PROPOSED)',
    color: '#e7b300',
    allDay: true,
    accepted: false
  }
*/

];

  view: MbscEventcalendarView = {
    calendar: {
      type: 'week'
    }
  };

  orderMyEvents(event: any) {
    if (event.meal == "breakfast") return -1;
    else return 1;
  }


  // // TABLE STARTS HERE

  

  //   displayedColumns = ['id', 'name', 'progress', 'color'];
  //   dataSource: MatTableDataSource<UserData>;
  
  //   @ViewChild(MatPaginator) paginator :any = MatPaginator;
  //   @ViewChild(MatSort) sort :any = MatSort;
  
  //   constructor() {
  //     // Create 100 users
  //     const users: UserData[] = [];
  //     for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
  
  //     // Assign the data to the data source for the table to render
  //     this.dataSource = new MatTableDataSource(users);
  //   }
  
  //   /**
  //    * Set the paginator and sort after the view init since this component will
  //    * be able to query its view for the initialized paginator and sort.
  //    */
  //   ngAfterViewInit() {
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  
  //   applyFilter(filterValue: string) {
  //     filterValue = filterValue.trim(); // Remove whitespace
  //     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //     this.dataSource.filter = filterValue;
  //   }

  //   // TABLE ENDS HERE



  }
  


  // // TABLE STARTS HERE

  // /** Builds and returns a new User. */
  // function createNewUser(id: number): UserData {
  //   const name =
  //       NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
  //       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  
  //   return {
  //     id: id.toString(),
  //     name: name,
  //     progress: Math.round(Math.random() * 100).toString(),
  //     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  //   };
  // }
  
  // /** Constants used to fill up our data base. */
  // const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  //   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
  // const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  //   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  //   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
  
  // export interface UserData {
  //   id: string;
  //   name: string;
  //   progress: string;
  //   color: string;
  // }

  // // TABLE ENDS HERE
