import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { SignInSignUpService } from 'src/app/sign-in-sign-up.service';
import firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import 'firebase/firestore';
import 'firebase/auth';

import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { OwnerServiceService } from 'src/app/services/owner.service';

import { IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { MassegesPage } from 'src/app/feedback/masseges/masseges.page';
//////////////Geolocation and Geocode//////////
import { Plugins } from '@capacitor/core';
const { Geolocation, Toast } = Plugins;
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-view-walkins',
  templateUrl: './view-walkins.page.html',
  styleUrls: ['./view-walkins.page.scss'],
})
export class ViewWalkinsPage implements OnInit {
  spaceuid = this.route.snapshot.params.spaceuid;
  category = this.route.snapshot.params.category;
  profileuid = this.route.snapshot.params.profileuid;
  walkinList:any=[]
  constructor(private nativeGeocoder: NativeGeocoder, private ngZone: NgZone,private popover:PopoverController,private route:ActivatedRoute,public ownerservice:OwnerServiceService,public account:SignInSignUpService) { 

    firebase.firestore().collection("profiles")
    .doc(this.account.getUserSession())
    .collection("profile").doc(this.profileuid).collection("space").doc(this.spaceuid)
  .collection("walkins").where("spaceuid","==",this.spaceuid).orderBy("date")
.get()
.then(doc => {

doc.forEach(dat=>{
  
this.walkinList.push(Object.assign(dat.data(),{"walkinuid":dat.id}))
console.log(dat.data())
})
})

  }

  ngOnInit() {
  }

}
