import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';

describe('RecipeDeleteDialogComponent', () => {
  let component: RecipeDeleteDialogComponent;
  let fixture: ComponentFixture<RecipeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDeleteDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        HttpClient,
        HttpHandler,
        AuthService],
      imports: [
          MatInputModule,
          MatDialogModule,
          BrowserAnimationsModule
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
