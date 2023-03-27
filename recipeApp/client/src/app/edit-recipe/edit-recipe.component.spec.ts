import {ComponentFixture, TestBed} from '@angular/core/testing';
import { EditRecipeContentModule } from './edit-recipe.component';

let component: EditRecipeContentModule;
let fixture: ComponentFixture<EditRecipeContentModule>;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ EditRecipeContentModule ]
  })
  .compileComponents();

  fixture = TestBed.createComponent(EditRecipeContentModule);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

it('should create', () => {
  expect(component).toBeTruthy();
});
