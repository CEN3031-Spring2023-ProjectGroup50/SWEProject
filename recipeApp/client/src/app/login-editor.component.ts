import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';


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
        private httpClient: HttpClient,
        private authService: AuthService
    ){}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        })
        this.loginForm.valueChanges.subscribe(()=>
        this.errorMessage = '')
    }
    async addLogin() {
        await this.httpClient.post('/server/login', {
          email: this.loginForm.value['email'],
          password: this.loginForm.value['password']
        }).subscribe(
            (res) => { 
                console.log(res)
                const val = this.loginForm.value;
                this.authService.login(val.email, val.password);   
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