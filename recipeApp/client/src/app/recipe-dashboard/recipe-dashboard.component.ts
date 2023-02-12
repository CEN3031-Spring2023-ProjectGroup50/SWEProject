import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-recipe-dashboard',
  templateUrl: './recipe-dashboard.component.html',
  styleUrls: ['./recipe-dashboard.component.css']
})
export class RecipeDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */ /*<--this was the original comment */
  /* I always want 2x2 on the dashboard so I adjusted the column & row #s*/
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Takitos', author: "Jane Doe's recipe", cols: 1, rows: 1, description: "This recipe is so deliscious WOW! And this description is really super detailed and tells you everything you would ever need to know at-a-glance. Easy to make, easy to clean, healthy.", headerimagecss: "header-image-mallow", mainimage: "/assets/images/foodimage.jpg"},
          { title: 'Pancakes', author: "Mallow's recipe", cols: 1, rows: 1, description: "This is a test description", headerimagecss: "header-image-mallow", mainimage: "/assets/images/imgpancakes.jpeg"},
          { title: 'Card 3A', author: "PERSON3 recipe", cols: 1, rows: 1, description: "content 3A", headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg"},
          { title: 'Card 4A', author: "PERSON4 recipe", cols: 1, rows: 1, description: "content 4A", headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
          { title: 'Card 5A', author: "PERSON4 recipe", cols: 1, rows: 1, description: "content 5A", headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
          { title: 'Card 6A', author: "PERSON4 recipe", cols: 1, rows: 1, description: "content 6A", headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg" }
        ];
      }

      return [
        { title: 'Takitos', author: "Jane Doe's recipe", cols: 1, rows: 1, description: "This recipe is so deliscious WOW! And this description is really super detailed and tells you everything you would ever need to know at-a-glance. Easy to make, easy to clean, healthy.", headerimagecss: "header-image-mallow", mainimage: "/assets/images/foodimage.jpg" },
        { title: 'Pancakes', author: "Mallow's recipe", cols: 1, rows: 1, description: "This is a test description", headerimagecss: "header-image-mallow", mainimage: "/assets/images/imgpancakes.jpeg" },
        { title: 'Card 3B', author: "PERSON2B recipe", cols: 1, rows: 1, description: "content 3B",headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
        { title: 'Card 4B', author: "PERSON2B recipe", cols: 1, rows: 1, description: "content 4B", headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
        { title: 'Card 5A', author: "PERSON4 recipe", cols: 1, rows: 1, description: "content 5A", headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
        { title: 'Card 6A', author: "PERSON4 recipe", cols: 1, rows: 1, description: "content 6A", headerimagecss: "header-image-mallow", mainimage: "https://material.angular.io/assets/img/examples/shiba2.jpg" }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
