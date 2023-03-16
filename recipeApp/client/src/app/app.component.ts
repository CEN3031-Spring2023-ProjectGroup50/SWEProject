import { Component,Input} from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  // ngOnInit() {
  //         this.router.navigateByUrl('/login');
  //       };
  
  constructor(private router: Router, private authService: AuthService) {

  }
}
