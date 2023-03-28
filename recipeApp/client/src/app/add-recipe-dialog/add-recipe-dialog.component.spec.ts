import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddRecipeDialogComponent } from './add-recipe-dialog.component';

describe('AddRecipeDialogComponent', () => {
  let component: AddRecipeDialogComponent;
  let fixture: ComponentFixture<AddRecipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        HttpClient,
        HttpHandler,
        AuthService
      ],
      imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
