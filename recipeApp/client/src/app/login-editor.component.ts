import {Component} from '@angular/core'
import { FormGroup,FormControl } from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'

@Component({
    selector:'app-login-editor',
    templateUrl: './login-editor.component.html',
    styleUrls: ['./app.component.css']
})
export class LoginEditorComponent {
    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    })
    onSubmit() {
        console.log(this.loginForm.value)
    }
}