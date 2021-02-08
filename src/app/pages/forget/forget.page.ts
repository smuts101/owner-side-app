import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { SignInSignUpService } from 'src/app/sign-in-sign-up.service';

import firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import 'firebase/firestore';
import 'firebase/auth';
import { from } from 'rxjs';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  email: any;
  constructor(
    private auth: SignInSignUpService, private route:Router,public loadingCtrl: LoadingController,private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

   async Reset() {
    const loading = await this.loadingCtrl.create();
  //  const alert = await this.alertCtrl.create({
  //     message: `Success!!, An Email was sent to this Email address` + ' ' + this.email + ' ' + 'Click Okay to continue to Sign In',
  //     buttons: [
  //       {
  //         text: 'Okay',
  //         handler: async () => {
            // console.log(this.createForm.value);
    if (this.email) {
      firebase.auth().sendPasswordResetEmail(this.email).then((r) => {
        console.log("Email Reset");
        this.showAlertEmailSent();
        this.route.navigateByUrl('/signin')
      }).then(() => {
      loading.dismiss().then(() => {
        // this.router.navigateByUrl('/update-space');
      });
    },
      error => {
        loading.dismiss().then(() => {
          console.log(error.message);
          this.showAlertErrorEmail();
        });
      }
    );
    return await loading.present();
    }
    
    //   }
    //     },
    //   ]
    // });
    // return await alert.present();
  }

async showAlertErrorEmail() { 
  const alert = await this.alertCtrl.create({ 
       message: 'The entered Email ' + ' ' + this.email + ' ' + ' does not exist on our databases, enteterd correct one.',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
      }
        },
      ]
    }); 
   await alert.present(); 
  } 
  
  async showAlertEmailSent() { 
  const alert = await this.alertCtrl.create({ 
       message: `Success!!, An Email was sent to this Email address ` + '  ' + this.email + '  ' + ' Click Okay to continue to Sign In',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
      }
        },
      ]
    }); 
   await alert.present(); 
  }


}
