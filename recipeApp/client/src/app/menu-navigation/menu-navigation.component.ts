import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';
import { SharedFunctionsService } from '../shared/shared-functions.service';
import { Router, Routes, RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent {

  @ViewChild('drawer') drawer: MatSidenav;
  toggle() {
      this.drawer.toggle();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuToggleSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public sharedService: SharedFunctionsService,
    public router: Router
    ) {
      this.menuToggleSub =   
      this.sharedService.getMenuResponse().subscribe(()=>{
        this.toggle();
        });
    }
}
