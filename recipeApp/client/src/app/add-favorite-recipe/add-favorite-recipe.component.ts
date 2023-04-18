import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { HttpParams } from '@angular/common/http';
import { SharedFunctionsService } from '../shared/shared-functions.service';


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




@Component({
  selector: 'add-favorite-recipe',
  templateUrl: './add-favorite-recipe.component.html',
  styleUrls: ['./add-favorite-recipe.component.css']
})
export class AddFavoriteRecipeComponent {

  accountData: string;
  icon = "favorite_border"
  iconColor = "basic"
  favid: string | undefined;

  @Input() recipe: IRecipeItem;

  constructor(
    //@Input() public recipe: IRecipeItem,
    private httpClient: HttpClient,
    private authService: AuthService,
    private sharedService: SharedFunctionsService
    ) {}

    ngOnInit() {
      this.authService.getAccount().subscribe(
        (res: any) => {
            this.accountData = res.toString();
            this.checkFavorite();
        });
    }

    async checkFavorite() {
      let params = new HttpParams()
      params = params.append('uid',this.accountData)
      params = params.append('rid',this.recipe.Rid)
      this.favid = await this.httpClient.get<string>(`/server/favorites/check`, { params: params }).toPromise()
      if (this.favid != '0') {
        this.icon = 'favorite';
        this.iconColor = 'warn';
      }
    }

    toggleIcon() {
      if (this.icon === 'favorite_border') {
        this.icon = 'favorite';
        this.iconColor = 'warn';
      } else {
        this.icon = 'favorite_border'
        this.iconColor = 'basic';
      }
    }


    async addToFavorite() {
      await this.httpClient.post('/server/favorites/add', {
        userid: parseInt(this.accountData),
        recipeid: this.recipe.Rid,
      }).subscribe((post)=>{
        console.log("Recipe Added To Meal For User", this.accountData);
        this.sharedService.reload();
      });
  }

  
  async deleteFromFavorite() {

    let RidString = this.recipe.Rid.toString();
    let UidString = this.accountData.toString();
    let URL = `/server/favorites/delete/${UidString}/${RidString}`
    await this.httpClient.delete(URL)
      .subscribe({
        next: data=>{
          console.log('Recipe Deleted');
          this.sharedService.reload();
        },
        error: error=>{
          console.log('Delete Failed')
        }
      })
  }
}

