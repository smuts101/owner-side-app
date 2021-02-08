import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import 'firebase/firestore';
import 'firebase/auth';
import { from } from 'rxjs';
import { AlertController,LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SignInSignUpService {

  db = firebase.firestore()
  uidOwner: any
  emailOwner: any;
   email: any;
  uid: any;
  // UID:any;
  status: boolean;
  group: any;
  _error: any;

  constructor(private router: Router, public route: ActivatedRoute, public alertCtrl: AlertController,public loadingCtrl: LoadingController) { }

  signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
     if(user){
      const uid = user.uid;
      this.setuid(uid)
      console.log('user logged in: ', user);
     }else{
       console.log('user logged out')
     }
    });
  }
  setuid(a){
    this.uid = a;
  }
  getUid(){
    return this.uid;
  }
  Signup(email, password) {

    return firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
                var db = firebase.firestore();
                var userGroupCollecion = db.collection("profiles");
                return userGroupCollecion.doc(res.user.uid).collection("profile").doc(res.user.uid).set({
                    company_name: "company name",
                     company_email: email,
                    company_tel: "company telephone",
                    company_website: "www.webste.com",
                    social_media: "social media links",
                    company_address: "address",
                    usergroup: "owner",
                    uid: res.user.uid,
                  date: new Date()
                   

      }).then(() => {
        console.log(res.user);
        
                }).catch(function (error) {
                   this._error = error.message;
                    this.showAlertErrorfb();
                  console.log(error);
                });
      
    })

  }
  checkVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user.emailVerified == false) {
          console.log('you did not verify your email');
          this.showAlertEmailVerification();
          this.router.navigateByUrl('/signin');
          resolve(0)
        }
        else {
         this.router.navigateByUrl('/owner-landing');
          resolve(1)
        }
      })
    })
  }

  async SignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(results => {
      console.log(results);
      var user = firebase.auth().currentUser;
      var email, uid;
      if (user != null) {
        email = user.email;
        uid = user.uid;
        this.userSession(uid);
        this.checkExistance(this.getUserSession())
        
        console.log("details: " + email + ' ' + this.getUserSession())
      }
      
    }).catch((error) => {
      this._error = error.message;
      this.showAlertErrorfb();
      this.router.navigateByUrl('/signin');
      console.log(this._error);
    })
  }
  userSession(uidOwner) {
    this.uidOwner = uidOwner;
  }
  userEmail(emailOwner) {
    this.emailOwner = emailOwner;
  }

  getUserSession() {
    return this.uidOwner;
  }
  logOut() {
    this.uidOwner =null
    return this.uidOwner ;
  }
  getEmail() {
    return this.emailOwner;
  }

  checkExistance(uid) {
    this.db.collectionGroup("profile")
      .where("uid", "==", (uid))
      .get()
      .then(snap => {
        snap.forEach(doc => {
          if (!doc.exists) {
            console.log("No such user in the profiles Document!");
          } 
        if(doc.exists)
            if (doc.data().usergroup == 'owner') {
              console.log("Owner")
              this.status = true;            
              console.log("Document data:", doc.data());
              console.log("Yeess! looks like you have a business account profile with us");
              this.checkVerification();
              // this.router.navigateByUrl('/owner-landing');
            } 
              else  {
                console.log("User")
                this.status = false;
              }
          
        });
        if (this.status != true) {
          console.log("User");
          console.log("Oops! looks like you don't have a business account profile with us");
                this.showAlertError();
                // this.router.navigateByUrl('/signup'); 
        }
        
      });
  }
  setStatus(x) {
    this.status = x;
  }
  returnStatus() {
    return this.status
  }

  preventCrossLogin() {
    
  }  

   async showAlertError() { 
  const alert = await this.alertCtrl.create({ 
    // header: 'Alert!', 
       message: 'Oops! looks like you do not have a business account profile with us, Click Okay to Create one.',
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
  
  
   async showAlertErrorfb() { 
     const alert = await this.alertCtrl.create({ 
     header: 'Alert', 
    // subHeader: 'Sign in error!',
       message:  this._error,
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
  
  async showAlertEmailVerification() { 
  const alert = await this.alertCtrl.create({ 
    header: 'Alert!', 
       message: 'It looks like you did not veirfy your Email, please do so before you can signin',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            // this.router.navigateByUrl('/working-spaces');
      }
        },
      ]
    }); 
    await alert.present(); 
    
    
    
  } 
}