import {Component, OnInit, Input} from '@angular/core'
import { AuthService } from '../shared/auth/auth.service';
import { SharedFunctionsService } from '../shared/shared-functions.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['../app.component.css']

})

export class AppHeaderComponent {

    @Input() public isUserLoggedIn: boolean|false;

    titleLoggedOut = 'Welcome to Mallow!';

    titleLoggedIn = 'Save time, and savor every meal with Mallow.';

    constructor(public authService: AuthService, public sharedService: SharedFunctionsService) {}

}

