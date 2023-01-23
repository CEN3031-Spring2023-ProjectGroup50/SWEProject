import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IBackendItem {
  title: string,
  post: string 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent /*implements OnInit*/{
  public title = ''
  public post = ''
  public backendItems: IBackendItem[] | undefined = [] 


  constructor(
    private httpClient: HttpClient 
  ){}
    
  async ngOnInit() {
    await this.loadItems()
  }
  
  async loadItems() {
  
      this.backendItems = await this.httpClient.get<IBackendItem[]>('/server/newsfeed').toPromise()
  
  }
  
  async addPost() {
    await this.httpClient.post('/server/newsfeed', {
      title: this.title,
      post: this.post
    }).toPromise()
 
    await this.loadItems()
    this.title = ''
    this.post = ''
    }

  }

