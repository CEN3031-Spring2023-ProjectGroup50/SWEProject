import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import {OnInit, AfterViewInit} from '@angular/core';
import { colors } from '../calendar-header/colors';
import { Subject } from 'rxjs';
import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';
import { ChecklistModule } from 'angular-checklist';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
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
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],

})
export class GroceryListComponent {
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
  public ingredients = new Map<string, string[]>()
  public storedColors = new Map<string, any>()

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
    await this.loadItems()
    console.log(this.accountData)

    this.sharedService.aClickedEvent
    .subscribe((data:string) => {
      console.log('Event message from Calendar Header: ' + data);
      this.ngAfterViewInit();
      this.changeDetectorRef.detectChanges();
      this.refreshCalendar.next();

      console.log("ingredients")
      console.log(this.ingredients)
      console.log("userMeals")
      console.log(this.userMeals)
    });
  }

  async ngAfterViewInit() {
    this.getSun = await this.calendar.getSunday();
    console.log("getSun = " + this.getSun);
    this.loadItems();
  }

  async loadItems() {

    this.accountData = await this.getAccountData()

    let URL = `/server/meals/bydate`;

    let params = new HttpParams()
    params = params.append('date', this.getSun)
    params = params.append('uid', this.uid.toString())

    this.userMeals = await this.httpClient.get<userMeal[]>(URL, { params: params }).toPromise()

    this.ingredients = this.getIngredients(this.userMeals)

    return this.ingredients
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

  getIngredients(meals: userMeal[]|undefined){

    this.ingredients.clear()  // clear prev list

    for (let meal of meals!) {
      var newIngredients = this.formatIngredients(meal.Ingredients)
      this.ingredients.set(meal.Title, newIngredients)

      if (meal.Mealtype == "Breakfast") {
        this.storedColors.set(meal.Title, colors.Breakfast)
      }
      else if (meal.Mealtype == "Lunch") {
        this.storedColors.set(meal.Title, colors.Lunch)
      }
      else if (meal.Mealtype == "Dinner") {
        this.storedColors.set(meal.Title, colors.Dinner)
      }
      else {
        this.storedColors.set(meal.Title, colors.Other)
      }
      console.log(this.storedColors.get(meal.Title))
    }

    return this.ingredients
  }

  formatIngredients(Ingredients: string,) {
    let result = Ingredients.substring(2, Ingredients.length-2);
    result = result.replaceAll("\', \'" , "\n");
    var splitIngredients = result.split("\n")
    return splitIngredients;
  }

}