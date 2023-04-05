import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealplanDialogComponent } from './add-mealplan-dialog.component';

describe('AddMealplanDialogComponent', () => {
  let component: AddMealplanDialogComponent;
  let fixture: ComponentFixture<AddMealplanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMealplanDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMealplanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
