import {Component, OnInit} from '@angular/core'
import { FormGroup,FormControl,FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector:'app-register',
    templateUrl: './registerform.component.html',
    styleUrls: ['./app.component.css']
})
export class registerFormComponent implements OnInit {
    registerForm!: FormGroup
    popupMessage: string = ''

    constructor(
        private router: Router,
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
                this.registerForm.reset()
                this.router.navigate(['/home']) 
            },
            (err) => {
                console.log(err.message)
                this.registerForm.reset()
                this.popupMessage = "This account is already registered"
            })

        
    }
    
   
} 