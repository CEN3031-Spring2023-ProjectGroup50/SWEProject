import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'


@Component({
    selector:'app-login-editor',
    templateUrl: './login-editor.component.html',
    styleUrls: ['./app.component.css']
})
export class LoginEditorComponent implements OnInit {
    loginForm!: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ){}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        })
    }
    submit() {
        if (!this.loginForm.valid) {
          return;
        }
        console.log(this.loginForm.value);
      }


}