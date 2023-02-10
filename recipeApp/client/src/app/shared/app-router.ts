import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home.component';
import { LoginEditorComponent } from '../login-editor.component';
import { registerFormComponent } from '../registerform.component';
import { CanActivateViaAuthGuard } from '../shared/auth/can-activate-via-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginEditorComponent },
  { path: 'register', component: registerFormComponent },
  { path: 'home', component: HomeComponent,
    canActivate: [ 
      CanActivateViaAuthGuard 
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
