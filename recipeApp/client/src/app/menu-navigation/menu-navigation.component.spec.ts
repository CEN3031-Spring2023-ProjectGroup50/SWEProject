import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from '../shared/auth/auth.service';

import { MenuNavigationComponent } from './menu-navigation.component';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
//import { Router, Routes, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('MenuNavigationComponent', () => {
  let component: MenuNavigationComponent;
  let fixture: ComponentFixture<MenuNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuNavigationComponent,
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule
      ],
      providers: [
          HttpClient,
          AuthService,
          MatSidenav
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should create the menu navigation component', waitForAsync(() => {
    const fixture = TestBed.createComponent(MenuNavigationComponent);
    const appHeader = fixture.debugElement.componentInstance;
    expect(appHeader).toBeTruthy();}))

  it('drawer should default to open', () => {
    expect(component.drawer.opened).toBe(true);})

  it('drawer should close when toggled', () => {
    component.drawer.toggle()
    expect(component.drawer.opened).toBe(false);})

  it('should have content in navbar', () => {
    const navbar = fixture.debugElement.query(By.css('.sidenav'));
    expect(navbar).toBeTruthy();})

  it('should have a list in the navbar', () => {
    const list = fixture.debugElement.query(By.css('mat-nav-list'));
    expect(list).toBeTruthy();})

    


});
