import { RecipesComponent } from './recipes.component';
import { AuthInterceptorService } from '../shared/auth/auth-interceptor.service';
import { TestBed, waitForAsync, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpHandler,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/auth/auth.service';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        RouterModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatMenuModule,
        LayoutModule,
        MatPaginatorModule,
        CommonModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
        HttpClient,
        HttpHandler,
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Add Recipe" button', () => {
    let buttonElement =
      fixture.debugElement.nativeElement.querySelector("#add");
    expect(buttonElement.textContent).toBe('Add Recipe');
  });

  it('RecipeComponent opens the addRecipeDialog upon button click', fakeAsync(() => {
    spyOn(component, "openDialog");

    let buttonElement = fixture.debugElement.query(By.css('#add'));
    buttonElement.nativeElement.click();

    expect(component.openDialog).toHaveBeenCalled();
  }));
});
