import {ComponentFixture, TestBed} from '@angular/core/testing';
import { EditRecipeContentModule } from './edit-recipe.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';



describe('EditRecipeContentModule', () => {
  let component: EditRecipeContentModule;
  let fixture: ComponentFixture<EditRecipeContentModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipeContentModule ],
      imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatIconModule
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        HttpClient,
        HttpHandler,
        AuthService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecipeContentModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




