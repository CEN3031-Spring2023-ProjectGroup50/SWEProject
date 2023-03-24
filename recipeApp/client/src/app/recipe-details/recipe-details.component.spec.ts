import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import {Component, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RecipeDetailsModule } from './recipe-details.component';
import { AppModule } from '../app.module';

describe('RecipeDetailsModule', () => {
  let component: RecipeDetailsModule;
  let fixture: ComponentFixture<RecipeDetailsModule>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailsModule],
      imports: [
        MatDialog,
        AppModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  })


});
