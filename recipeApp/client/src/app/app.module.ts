import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginEditorComponent } from './login-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'

@NgModule({
    declarations: [
        AppComponent,
        LoginEditorComponent
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
    ]
})
export class AppModule { }
