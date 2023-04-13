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
    spyOn(component, "openAddRecipeDialog");

    let buttonElement = fixture.debugElement.query(By.css('#add'));
    buttonElement.nativeElement.click();

    expect(component.openAddRecipeDialog).toHaveBeenCalled();
  }));

  it('clicking "Search" calls setFilters() (no inputs)', () => {
    let spy = spyOn(component, "setFilters");
    let btn = fixture.debugElement.query(By.css('#search'));

    btn.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });
  it('clicking "Search" with \'crock pot\' in the keyword field calls setFilters(\'crock pot\', null)', () => {
    let hostElement: HTMLElement = fixture.nativeElement;
    let searchInput: HTMLInputElement = hostElement.querySelector('#keyword')!;
    let spy = spyOn(component, "setFilters");
    let btn = fixture.debugElement.query(By.css('#search'));

    searchInput.value = 'crock pot';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(searchInput.value, "");
  });

  it('clicking "Search" with \'cornichon\' in the ingredient field calls setFilters(null, \'cornichon\')', () => {
    let hostElement: HTMLElement = fixture.nativeElement;
    let searchInput: HTMLInputElement = hostElement.querySelector('#ingred')!;
    let spy = spyOn(component, "setFilters");
    let btn = fixture.debugElement.query(By.css('#search'));

    searchInput.value = 'cornichon';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith("", searchInput.value);
  });

  it('clicking "Search" with search terms \'crock pot\' and \'cornichon\' calls setFilters(crock pot, cornichon)', () => {
    let hostElement: HTMLElement = fixture.nativeElement;
    let searchInput1: HTMLInputElement = hostElement.querySelector('#keyword')!;
    let searchInput2: HTMLInputElement = hostElement.querySelector('#ingred')!;
    let spy = spyOn(component, "setFilters");
    let btn = fixture.debugElement.query(By.css('#search'));

    searchInput1.value = 'crock pot';
    searchInput1.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    searchInput2.value = 'cornichon';
    searchInput2.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(searchInput1.value, searchInput2.value);
  });

  it('clicking "Clear" calls clearFilters()', () => {
    let spy = spyOn(component, "clearFilters");

    let buttonElement = fixture.debugElement.query(By.css('#clear'));
    buttonElement.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('clicking "All Recipes" calls onAll()', () => {
    let spy = spyOn(component, "onAll");

    let buttonElement = fixture.debugElement.query(By.css('#allFilter'));
    buttonElement.nativeElement.dispatchEvent(new Event('change'))

    expect(spy).toHaveBeenCalled();
  });

  it('clicking "My Recipes" calls onUser()', () => {
    let spy = spyOn(component, "onUser");

    let buttonElement = fixture.debugElement.query(By.css('#userFilter'));
    buttonElement.nativeElement.dispatchEvent(new Event('change'))

    expect(spy).toHaveBeenCalled();
  });

});
