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
import { MatTableModule } from '@angular/material/table'

import { AppComponent } from './app.component';
import { LoginEditorComponent } from './login-editor/login-editor.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './shared/app-router';
import { registerFormComponent } from './registerform/registerform.component';
import { MenuNavigationComponent} from './menu-navigation/menu-navigation.component';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { StepperComponent } from './stepper/stepper.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { MealPlanPageComponent } from './meal-plan-page/meal-plan-page.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryListPageComponent } from './grocery-list-page/grocery-list-page.component';
//import { TestComponent } from './test.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import { CanActivateViaAuthGuard } from './shared/auth/can-activate-via-auth.guard';
import { NegateAuthGuard } from './shared/auth/negate-auth.guard';

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
        StepperComponent,
        MealPlanComponent,
        MealPlanPageComponent,
        GroceryListComponent,
        GroceryListPageComponent,
        //TestComponent,
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        CanActivateViaAuthGuard,
        NegateAuthGuard
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
        //RouterTestingModule,
        RouterModule,
        MatTableModule,
        MatSortModule,
    ],
    exports: [RecipesComponent,]
})
export class AppModule { }
