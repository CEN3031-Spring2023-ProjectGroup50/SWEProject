import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['../app.component.css']

})

export class WelcomeComponent {
    @Input() public isUserLoggedIn: boolean | undefined;
}

