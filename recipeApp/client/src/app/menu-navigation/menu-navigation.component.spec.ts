import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from '../shared/auth/auth.service';

import { MenuNavigationComponent } from './menu-navigation.component';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

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


});
