import { Component, ViewChild, OnInit } from '@angular/core'
import { NgForOf } from '@angular/common'
import { HttpClient, HttpParams } from '@angular/common/http'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { AuthService } from '../shared/auth/auth.service'
import { SharedFunctionsService } from '../shared/shared-functions.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { AddMealplanDialogComponent } from '../add-mealplan-dialog/add-mealplan-dialog.component'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { isNull } from 'cypress/types/lodash'
import { RecipeDeleteDialogComponent } from '../recipe-delete-dialog/recipe-delete-dialog.component'

interface IRecipeItem {
  Rid: number,
  Title: string,
  Ingredients: string,
  Instructions: string,
  Image_name: string,
  Uid: number,
  Email: string,
  Image: Uint8Array[],
}

interface rCount {
  total: number
}

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']

})

export class RecipesComponent {

  showFiller = false;
  isSearching = false;
  public backendItems: IRecipeItem[] | undefined = []
  public recipecount: rCount | undefined
  defaultAccount = "0"
  accountData = "0"
  uid = 0
  isLoading = false
  totalRows: number | undefined = 0
  pageSize = 10
  currentPage = 0
  pageSizeOptions: number[] = [5, 10, 25, 100]
  filter = 'all'
  loading = false;
  keywordSearchTerm = "";
  ingredientSearchTerm = "";
  favorites = false;
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: false })
  paginatorBottom!: MatPaginator

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private sharedService: SharedFunctionsService,
    private dialog: MatDialog
  ) {
    this.sharedService.getReloadResponse().subscribe(() => {
      this.loadItems();
    });
  }

  async ngOnInit() {
    this.authService.getAccount().subscribe(
      (res: any) => {
        this.accountData = res.toString();
        this.uid = parseInt(this.accountData);
        console.log("ngOnInit uid = " + this.uid)
      }
    );
    await this.loadItems();


  }

  async loadItems() {

    this.loading = true;

    let URL = `/server/recipes/bypage?page=${this.currentPage + 1}&per_page=${this.pageSize}`
    if (this.favorites == true) {
      URL = `/server/favorites/bypage?page=${this.currentPage + 1}&per_page=${this.pageSize}`
    }

    let params = new HttpParams()

    if (this.ingredientSearchTerm != "" && this.keywordSearchTerm != "") {
      params = params.append('keyword', this.keywordSearchTerm)
      params = params.append('ingredient', this.ingredientSearchTerm)
    }
    else if (this.ingredientSearchTerm != "") {
      params = params.append('ingredient', this.ingredientSearchTerm)
    }
    else if (this.keywordSearchTerm != "") {
      params = params.append('keyword', this.keywordSearchTerm)
    }
    if (this.filter == "user") {
      params = params.append('uid', this.accountData)
    }
    else {
      params = params.append('uid', this.defaultAccount)
    }

    this.backendItems = await this.httpClient.get<IRecipeItem[]>(URL, { params: params }).toPromise()

    if (this.favorites == true) {
      this.httpClient.get<rCount>(`/server/favoritecount`, { params: params })
        .subscribe((data) => {
          this.totalRows = data.total;
          this.loading = false;
        })
    }
    else {
      this.httpClient.get<rCount>(`/server/recipecount`, { params: params })
        .subscribe((data) => {
          this.totalRows = data.total;
          this.loading = false;
        })
    }
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadItems();
    this.paginator.page.emit(event)
  }

  pageBottomChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadItems();
  }

  async onAll(event: { value: string; }) {
    this.favorites = false
    this.filter = "all"
    await this.loadItems();
  }

  async onUser(event: { value: string; }) {
    this.favorites = false
    this.filter = "user"
    this.currentPage = 0
    await this.loadItems();
  }

  async onFavorites() {
    this.favorites = true
    this.filter = "user"
    this.currentPage = 0
    await this.loadItems();
  }

  openAddRecipeDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(AddRecipeDialogComponent, dialogConfig);
  }

  setFilters(keywordSearchTerm: string, ingredientSearchTerm: string) {
    this.keywordSearchTerm = keywordSearchTerm;
    this.ingredientSearchTerm = ingredientSearchTerm;

    if (keywordSearchTerm != "" || ingredientSearchTerm != "")
      this.isSearching = true;
    else
      this.isSearching = false;

    this.paginator.pageIndex = 0;
    this.currentPage = this.paginator.pageIndex;
    this.loadItems();
  }

  clearFilters() {
    this.keywordSearchTerm = "";
    this.ingredientSearchTerm = "";
    this.isSearching = false;
    this.loadItems();
  }

}
