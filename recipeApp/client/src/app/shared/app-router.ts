import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home.component';
import { LoginEditorComponent } from '../login-editor.component';
import { registerFormComponent } from '../registerform.component';
import { TestComponent } from '../test.component';
import { RecipesComponent } from '../recipes.component';
import { MealplanComponent } from '../mealplan.component';

export const routes: Routes = [
  { path: 'login', component: LoginEditorComponent },
  { path: 'register', component: registerFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent},
  { path: 'recipes', component: RecipesComponent},
  { path: 'mealplan', component: MealplanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
