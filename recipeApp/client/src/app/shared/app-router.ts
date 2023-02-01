import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginEditorComponent } from '../login-editor.component';
import { registerFormComponent } from '../registerform.component';

export const routes: Routes = [
  { path: 'login', component: LoginEditorComponent },
  { path: 'register', component: registerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
