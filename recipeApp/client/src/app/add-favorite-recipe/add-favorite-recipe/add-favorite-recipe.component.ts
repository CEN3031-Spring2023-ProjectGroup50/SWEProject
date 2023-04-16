import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';


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
  selector: 'app-add-favorite-recipe',
  templateUrl: './add-favorite-recipe.component.html',
  styleUrls: ['./add-favorite-recipe.component.css']
})
export class AddFavoriteRecipeComponent {

  @Input() recipe: IRecipeItem;

  constructor(
    @Input() public recipe: IRecipeItem,
    private httpClient: HttpClient,
    private authService: AuthService
    ) {}

}
