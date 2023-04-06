import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import {Component, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RecipeDetailsContentModule, RecipeDetailsModule } from './recipe-details.component';
import { AppModule } from '../app.module';
import { By } from '@angular/platform-browser';

describe('RecipeDetails Experience', () => {
  let componentBtn: RecipeDetailsModule;
  let fixtureBtn: ComponentFixture<RecipeDetailsModule>;
  let componentDia: RecipeDetailsContentModule;
  let fixtureDia: ComponentFixture<RecipeDetailsContentModule>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailsModule],
      imports: [
        AppModule
      ],
      providers: [
        MatDialog,
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixtureBtn = TestBed.createComponent(RecipeDetailsModule);
    componentBtn = fixtureBtn.componentInstance;
    fixtureBtn.detectChanges();
    fixtureDia = TestBed.createComponent(RecipeDetailsContentModule);
    componentDia = fixtureDia.componentInstance;
    fixtureDia.detectChanges();
  });

  it('RDM should compile', () => {
    expect(componentBtn).toBeTruthy();
  });
  it('RDCM should compile', () => {
    expect(componentDia).toBeTruthy();
  });
  it('clicking "View Recipe" calls openDialog()', () => {
    let spy = spyOn(componentBtn, "openDialog");
    let btn = fixtureBtn.debugElement.query(By.css('#view'));

    btn.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  })

});
