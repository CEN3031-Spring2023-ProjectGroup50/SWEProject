import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card'
import { Routes, RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatSnackBarModule } from '@angular/material/snack-bar';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from './meal-plan/calendar-header.component';


import { AppComponent } from './app.component';
import { LoginEditorComponent } from './login-editor/login-editor.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './shared/app-router';
import { registerFormComponent } from './registerform/registerform.component';
import { MenuNavigationComponent} from './menu-navigation/menu-navigation.component';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MealPlanComponent, MealDetailsDialog, MealDeleteConfirmationDialog, MealEditDialog } from './meal-plan/meal-plan.component';
import { MealPlanPageComponent } from './meal-plan-page/meal-plan-page.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryListPageComponent } from './grocery-list-page/grocery-list-page.component';
import { RecipeDetailsModule, RecipeDetailsContentModule} from './recipe-details/recipe-details.component';
import { EditRecipeModule, EditRecipeContentModule} from './edit-recipe/edit-recipe.component';
import { AddRecipeDialogComponent } from './add-recipe-dialog/add-recipe-dialog.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import { CanActivateViaAuthGuard } from './shared/auth/can-activate-via-auth.guard';
import { NegateAuthGuard } from './shared/auth/negate-auth.guard';
import { RecipeDeleteDialogComponent, RecipeDeleteDialogContent } from './recipe-delete-dialog/recipe-delete-dialog.component';
import { AddMealplanDialogComponent, AddMealplanContentComponent } from './add-mealplan-dialog/add-mealplan-dialog.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginEditorComponent,
        registerFormComponent,
        WelcomeComponent,
        AppHeaderComponent,
        MenuNavigationComponent,
        HomeComponent,
        RecipesComponent,
        MealPlanComponent,
        MealPlanPageComponent,
        GroceryListComponent,
        GroceryListPageComponent,
        AddRecipeDialogComponent,
        RecipeDetailsModule,
        RecipeDetailsContentModule,
        EditRecipeModule,
        EditRecipeContentModule,
        RecipeDeleteDialogComponent,
        RecipeDeleteDialogContent,
        AddMealplanDialogComponent,
        AddMealplanContentComponent,
        CalendarHeaderComponent,
        MealDetailsDialog,
        MealDeleteConfirmationDialog,
        MealEditDialog,
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        CanActivateViaAuthGuard,
        NegateAuthGuard,
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {hasBackdrop: false}
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatRippleModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatMenuModule,
        LayoutModule,
        MatPaginatorModule,
        CommonModule,
        RouterModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
          NgbModalModule,

    ],
    exports: [RecipesComponent,CalendarHeaderComponent],
})
export class AppModule { }
