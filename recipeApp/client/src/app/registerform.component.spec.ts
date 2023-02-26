import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { registerFormComponent } from './registerform.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';


describe('registrationForm', () => {

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [ registerFormComponent ],
          imports:[
            HttpClientModule
          ],
          providers: [
            HttpClient
          ]
        }).compileComponents();
     }));

    it('should be fine (this is to confirm the test is set up properly)', () => {
        expect(true).toBeTruthy();
    })

    // INSERT UNIT TESTS AND DESCRIPTIONS BELOW

})