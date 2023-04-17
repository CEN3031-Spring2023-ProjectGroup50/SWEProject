import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { GroceryListPageComponent } from './grocery-list-page.component';
import { AppModule } from '../app.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { By } from '@angular/platform-browser';

describe('GroceryListPageComponent', () => {
  let component: GroceryListPageComponent;
  let fixture: ComponentFixture<GroceryListPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryListPageComponent],
      imports: [
        AppModule
      ],
      
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryListPageComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  })

  it('should create the grocery list page component', waitForAsync(() => {
    const fixture = TestBed.createComponent(GroceryListPageComponent);
    const grocListPage = fixture.debugElement.componentInstance;
    expect(grocListPage).toBeTruthy();
  }))
  
  it('should display the menu-nav for the grocery list page', () => {
    let element = fixture.debugElement.query(By.css('#menuNav'));
    expect(element.nativeElement).toBeTruthy();
  })

});