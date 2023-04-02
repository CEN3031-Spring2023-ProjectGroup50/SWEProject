import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';

describe('RecipeDeleteDialogComponent', () => {
  let component: RecipeDeleteDialogComponent;
  let fixture: ComponentFixture<RecipeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDeleteDialogComponent ]
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
