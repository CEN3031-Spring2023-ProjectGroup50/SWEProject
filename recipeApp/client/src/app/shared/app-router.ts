import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home.component';
import { LoginEditorComponent } from '../login-editor.component';
import { registerFormComponent } from '../registerform.component';
import { CanActivateViaAuthGuard } from '../shared/auth/can-activate-via-auth.guard';
import { NegateAuthGuard } from './auth/negate-auth.guard';

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
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
