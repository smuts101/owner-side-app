import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { SignInSignUpService } from 'src/app/sign-in-sign-up.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  _error:any
  constructor(private formBuilder:FormBuilder, private accountService:SignInSignUpService,private router: Router,public nav: NavController,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController ) { }

  createForm = this.formBuilder.group({
    email: [''],
    password: ['']
});

get email() {
  return this.createForm.get("email");
}
get password() {
  return this.createForm.get("password");
}

public errorMessages = {

  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Please enter a valid email address' }
  ],
  password:[
    { type: 'required', message: 'Email is required' }
  ]



};


  ngOnInit() {
    this.createForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })


  }
 
  async submit() {
    const loading = await this.loadingCtrl.create();
            console.log(this.createForm.value);
            if (this.createForm.valid) {
              this.accountService.Signup(this.createForm.value.email, this.createForm.value.password).then((res) => {
                this.showAlertSuccessReg();
                firebase.auth().currentUser.sendEmailVerification();
              }).then(() => {
                loading.dismiss().then(() => {
                  // firebase.auth().currentUser.sendEmailVerification();
                  this.router.navigateByUrl('/signin');
                });
              },
                error => {
                  loading.dismiss().then(() => {
                    this._error = error.message;
                    this.showAlertErrorfb();
                    console.log(error);
                    this.router.navigateByUrl('/signup');
                    this.createForm.reset();
                  });
                }
            );
    return await loading.present();
          }
   
  }
  
    async showAlertErrorfb() { 
     const alert = await this.alertCtrl.create({ 
     header: 'Alert', 
    // subHeader: 'Sign in error!',
       message:  this._error,
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            this.router.navigateByUrl('/signup');
      }
        },
      ]
    }); 
   await alert.present(); 
  }
  
  
    async showAlertSuccessReg() { 

  const alert = await this.alertCtrl.create({ 
      header: 'Alert!', 
       message: 'Account Registered using' + this.email + ' Click Okay to sign in and finish creating a business profile',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            this.router.navigateByUrl('/signin');
      }
        },
      ]
    }); 
    await alert.present(); 
    
    
    
  } 
  }


