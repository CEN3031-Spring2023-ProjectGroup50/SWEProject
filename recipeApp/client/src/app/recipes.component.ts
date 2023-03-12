import {Component, ViewChild, OnInit} from '@angular/core'
import { NgForOf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';



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
    styleUrls: ['./app.component.css']

})

export class RecipesComponent {

  showFiller = false;

  public backendItems: IRecipeItem[] | undefined = []
  public recipecount: rCount | undefined
  isLoading = false
  totalRows = 0
  pageSize = 10
  currentPage = 0
  pageSizeOptions: number[] = [5,10,25,100]

  @ViewChild(MatPaginator, {static:false})
  paginator!: MatPaginator;
  @ViewChild(MatPaginator, {static:false})
  paginatorBottom!:MatPaginator

  constructor(
    private httpClient: HttpClient,
  ){}

  async ngOnInit() {
    await this.loadItems()
    //this.httpClient.get(`/server/recipecount`).subscribe((data=>toInteger(this.totalRows)))
    
    
  }

async loadItems() {
    let URL = `/server/recipes/bypage?page=${this.currentPage+1}&per_page=${this.pageSize}`
    this.backendItems =await this.httpClient.get<IRecipeItem[]>(URL).toPromise()
    this.httpClient.get<rCount>(`/server/recipecount`).subscribe((data)=>{this.totalRows = data.total})

    

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

}