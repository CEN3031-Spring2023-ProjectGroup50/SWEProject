import {Component, ViewChild, OnInit} from '@angular/core'
import { NgForOf } from '@angular/common'
import { HttpClient, HttpParams } from '@angular/common/http'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import {AuthService} from '../shared/auth/auth.service'

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';



interface IRecipeItem {
    Rid: number,
    Title: string,
    Ingredients: string,
    Instructions: string,
    Image_name: string,
    Uid: number,
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

  public backendItems: IRecipeItem[] | undefined = []
  public recipecount: rCount | undefined
  defaultAccount = "0"
  accountData="0"
  isLoading = false
  totalRows = 0
  pageSize = 10
  currentPage = 0
  pageSizeOptions: number[] = [5,10,25,100]
  filter = 'all'

  @ViewChild(MatPaginator, {static:false})
  paginator!: MatPaginator;
  @ViewChild(MatPaginator, {static:false})
  paginatorBottom!:MatPaginator


  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog
  ){}

  async ngOnInit() {
    this.authService.getAccount().subscribe(
      (res: any) => {
          this.accountData = res.toString();

      }
    );
    await this.loadItems()

  }

async loadItems() {


    let URL = `/server/recipes/bypage?page=${this.currentPage+1}&per_page=${this.pageSize}`
    let params = new HttpParams().set('uid',this.defaultAccount)

    if (this.filter == "user"){
      params = new HttpParams().set('uid',this.accountData)
    }

    this.backendItems =await this.httpClient.get<IRecipeItem[]>(URL,{params: params}).toPromise()
    this.httpClient.get<rCount>(`/server/recipecount`,{params:params}).subscribe((data)=>{this.totalRows = data.total})

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
  this.filter = "all"
  await this.loadItems();
}

async onUser(event: { value: string; }) {
  this.filter = "user"
  this.currentPage = 0
  await this.loadItems();
}

openDialog() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.autoFocus = true;

  this.dialog.open(AddRecipeDialogComponent, dialogConfig);
}




}
