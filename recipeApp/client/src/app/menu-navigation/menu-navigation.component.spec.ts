import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule, FormGroup,FormControl,FormBuilder } from '@angular/forms'
import {HttpClientModule, HttpClient,HTTP_INTERCEPTORS} from '@angular/common/http'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card'

import { MenuNavigationComponent } from './menu-navigation.component';
import { RecipesComponent } from '../recipes.component';

import { AuthInterceptorService } from '../shared/auth/auth-interceptor.service';
import { AuthService } from '../shared/auth/auth.service';

describe('MenuNavigationComponent', () => {
  let component: MenuNavigationComponent;
  let fixture: ComponentFixture<MenuNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuNavigationComponent,
        RecipesComponent,
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatPaginatorModule,
        MatGridListModule,
        MatCardModule
      ],
      providers: [
          HttpClient,
          AuthService,
          {
              provide: HTTP_INTERCEPTORS,
              useClass: AuthInterceptorService,
              multi: true
          },
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
