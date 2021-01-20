import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import 'firebase/firestore';
import 'firebase/auth';
import { IonInfiniteScroll } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { OwnerServiceService } from 'src/app/services/owner.service';
import { SignInSignUpService } from 'src/app/sign-in-sign-up.service';
@Component({
  selector: 'app-view-space',
  templateUrl: './view-space.page.html',
  styleUrls: ['./view-space.page.scss'],
})
export class ViewSpacePage implements OnInit {
  
  address:any
  spaceuid = this.route.snapshot.params.spaceuid;
  profuid = this.route.snapshot.params.profuid;
  spaceId= this.route.snapshot.params.spaceId;
  categories: any;
  image: any;
  description: any;
  amenities: any=[];
  constructor(private route:ActivatedRoute,public ownerservice:OwnerServiceService,public account:SignInSignUpService) { 
  
    firebase.firestore().collection("profiles")
    .doc(this.profuid)
    .collection("profile").doc(this.spaceuid).collection("space").doc(this.spaceId).get().then(doc=>{
        this.address = doc.data().address;
        this.categories = doc.data().categories
        this.image = doc.data().image;
        this.description =  doc.data().description;
        this.amenities .push(doc.data().amenities) ;
        
       console.log( doc.data())
    })
  }


 

  ngOnInit() {
  }

}
