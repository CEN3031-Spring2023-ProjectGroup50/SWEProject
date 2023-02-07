import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';


@Component({
    selector:'app-register',
    templateUrl: './registerform.component.html',
    styleUrls: ['./app.component.css']
})
export class registerFormComponent implements OnInit {
    registerForm!: FormGroup
    successMessage: string = ''
    errorMessage: string = ''

    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient
    ){}

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        })
    }
    async addLogin() {
        await this.httpClient.post('/server/register', {
          email: this.registerForm.value['email'],
          password: this.registerForm.value['password']
        }).subscribe(
            (res) => { 
                console.log(res)
                this.successMessage = "Registration successful"
            },
            (err) => {
                console.log(err.message)
                this.errorMessage = "This account is already registered"
            })

        this.registerForm.reset()
        this.errorMessage = ""
    }
    
   
} 