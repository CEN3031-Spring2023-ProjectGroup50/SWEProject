import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteRecipeComponent } from './add-favorite-recipe.component';

describe('AddFavoriteRecipeComponent', () => {
  let component: AddFavoriteRecipeComponent;
  let fixture: ComponentFixture<AddFavoriteRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavoriteRecipeComponent ]
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
