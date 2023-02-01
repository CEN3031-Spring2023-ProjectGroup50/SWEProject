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

    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient
    ){}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        })
    }
    async addLogin() {
        await this.httpClient.post('/server/login', {
          email: this.loginForm.value['email'],
          password: this.loginForm.value['password']
        }).toPromise()
        console.log(this.loginForm.value);
    }
    submit() {
        if (!this.loginForm.valid) {
          return;
        }
        console.log(this.loginForm.value);
      }


}