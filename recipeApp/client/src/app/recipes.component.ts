import {Component, ViewChild, OnInit} from '@angular/core'
import { NgForOf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface IRecipeItem {
    rid: number,
    Title: string,
    ingredients: string,
    instructions: string,
    image_name: string,
    cleaned_ingredients: string

}

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./app.component.css']

})

export class RecipesComponent {

  showFiller = false;

  public backendItems: IRecipeItem[] | undefined = []
  isLoading = false
  totalRows = 0
  pageSize = 10
  currentPage = 0
  pageSizeOptions: number[] = [5,10,25,100]

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private httpClient: HttpClient,
  ){}

  async ngOnInit() {
    await this.loadItems()
    this.paginator.length = 13000
  }

async loadItems() {
    let URL = `/server/recipes/bypage?page=${this.currentPage+1}&per_page=${this.pageSize})`
    this.backendItems =await this.httpClient.get<IRecipeItem[]>(URL).toPromise()

    

}

pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadItems();
  }

}