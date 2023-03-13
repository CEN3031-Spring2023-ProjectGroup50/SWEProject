import {Component, OnInit} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {AuthService} from './shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./app.component.css']

})

export class HomeComponent implements OnInit {
    accountData: any;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.getAccount().subscribe(
            (res: any) => {
                this.accountData = res;
                console.log(this.accountData)
            }, (err: any) => {
                this.router.navigateByUrl('/login');
            }
        );
    }
 
    // Home shows the menu sidenav & whatever data is selected in the container

}
