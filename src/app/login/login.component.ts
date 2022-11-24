
import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatDialog,MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { user } from '@angular/fire/auth';

export function passwordsMatchValidator(): ValidatorFn{
  return(contrl: AbstractControl): ValidationErrors|null=>{
    const password = contrl.get('password')?.value;
    const confirmPassword = contrl.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}


@Component({
  selector: 'app-newlogin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//sigin

signUpForm = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required),
  //   name: ['', Validators.required],
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', Validators.required],
  //   confirmPassword: ['', Validators.required],
  // },
  // { validators: passwordsMatchValidator()
});


//login
 loginForm=new FormGroup({
email:new FormControl('',[Validators.required,Validators.email]),
password: new FormControl('',Validators.required),
 });

  constructor(private authService:AuthenticationService,
     private router:Router,
     private toast:HotToastService,
     public dialog:MatDialog,
    ) { }



  ngOnInit(): void {}
//sigin
get signemail() {
  return this.signUpForm.get('email');
}

get signpassword() {
  return this.signUpForm.get('password');
}

get confirmPassword() {
  return this.signUpForm.get('confirmPassword');
}

get name() {
  return this.signUpForm.get('name');
}


  //login
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: ({ message }) => `There was an error: ${message} `,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/meeting']);
        this.dialog.closeAll()
      });
  }

  signsubmit(){

    const {name,email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !email || !password) {
      return;
    }
    this.authService.signUp( name as string,email,password).pipe(
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing up...',
        error: ({ message }) => `${message}`,
      })

    ).subscribe(() => {
      this.router.navigate(['/meeting']);
      this.dialog.closeAll()
    });
  }
}

