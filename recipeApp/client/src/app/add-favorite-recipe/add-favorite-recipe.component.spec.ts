import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteRecipeComponent } from './add-favorite-recipe.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('AddFavoriteRecipeComponent', () => {
  let component: AddFavoriteRecipeComponent;
  let fixture: ComponentFixture<AddFavoriteRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavoriteRecipeComponent ],
      imports: [
        HttpClientModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        HttpClient,
        AuthService

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFavoriteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
