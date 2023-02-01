import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginEditorComponent } from './login-editor.component';
import { WelcomeComponent } from './welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card'
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './shared/app-router';
import { registerFormComponent } from './registerform.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginEditorComponent,
        registerFormComponent,
        WelcomeComponent,
    
    ],
    providers: [],
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
        MatCardModule
    ]
})
export class AppModule { }
