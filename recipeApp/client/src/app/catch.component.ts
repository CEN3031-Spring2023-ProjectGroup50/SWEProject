import {Component, OnInit} from '@angular/core'
import { NgForOf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { RecipeDashboardComponent } from './recipe-dashboard/recipe-dashboard.component'

interface IRecipeItem {
    rid: number,
    Title: string,
    ingredients: string,
    instructions: string,
    image_name: string,
    cleaned_ingredients: string

}

@Component({
    selector: 'catch',
    templateUrl: './test.component.html',
    styleUrls: ['./app.component.css']



})

export class CatchComponent {
  public backendItems: IRecipeItem[] | undefined = []

  constructor(
    private httpClient: HttpClient
  ){}

  async ngOnInit() {
    await this.loadItems()
  }

async loadItems() {
    this.backendItems =await this.httpClient.get<IRecipeItem[]>('/server/recipes/bypage?page=1&per_page=10').toPromise()

}

}