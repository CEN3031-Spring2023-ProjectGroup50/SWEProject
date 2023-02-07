import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector:'app-login-editor',
    templateUrl: './login-editor.component.html',
    styleUrls: ['./app.component.css']
})
export class LoginEditorComponent implements OnInit {
    loginForm!: FormGroup
    errorMessage: string = ''

    constructor(
        private router: Router,
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
        }).subscribe(
            (res) => { 
                console.log(res)
                this.router.navigate(['/home'])     
            },
            (err) => {
                console.log(err.message)
                this.errorMessage = "The email or password does not match a valid account"
            })
            this.loginForm.reset()
    }
    
    submit() {
        if (!this.loginForm.valid) {
          return;
        }
        console.log(this.loginForm.value);
      }


}