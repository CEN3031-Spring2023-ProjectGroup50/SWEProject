import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';


@Component({
    selector:'app-login-editor',
    templateUrl: './login-editor.component.html',
    styleUrls: ['./app.component.css']
})
export class LoginEditorComponent implements OnInit {
    loginForm!: FormGroup
    httpClient! : HttpClient

    constructor(
        private formBuilder: FormBuilder
    ){}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        })
    }
    addPost() {
        this.httpClient.post('/server/login', {
          email: this.loginForm.value['email'],
          password: this.loginForm.value['password']
        })
    }
    submit() {
        if (!this.loginForm.valid) {
          return;
        }
        console.log(this.loginForm.value);
      }


}