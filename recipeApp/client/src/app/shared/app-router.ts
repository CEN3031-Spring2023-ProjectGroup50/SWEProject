import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home.component';
import { LoginEditorComponent } from '../login-editor.component';
import { registerFormComponent } from '../registerform.component';
import { CanActivateViaAuthGuard } from '../shared/auth/can-activate-via-auth.guard';
import { NegateAuthGuard } from './auth/negate-auth.guard';
//import { TestComponent } from '../test.component';
import { RecipesComponent } from '../recipes.component';
import { MealPlanPageComponent } from '../meal-plan-page/meal-plan-page.component';
import { GroceryListPageComponent } from '../grocery-list-page/grocery-list-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginEditorComponent,
    canActivate: [ 
      NegateAuthGuard
    ]
 },
  { path: 'register', component: registerFormComponent,
    canActivate: [ 
      NegateAuthGuard
    ]
 },
  { path: 'home', component: HomeComponent,
    canActivate: [ 
      CanActivateViaAuthGuard 
    ]
  },
  //{ path: 'test', component: TestComponent},

  /*
  { path: 'recipes', component: RecipesComponent,
    canActivate: [ 
      CanActivateViaAuthGuard 
    ]
  },
  */

  { path: 'mealplan', component: MealPlanPageComponent,
    canActivate: [ 
      CanActivateViaAuthGuard 
    ]
  },

  { path: 'grocerylist', component: GroceryListPageComponent,
  canActivate: [ 
    CanActivateViaAuthGuard 
  ]
},


  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
