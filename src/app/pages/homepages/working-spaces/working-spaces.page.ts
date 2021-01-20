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
  selector: 'app-working-spaces',
  templateUrl: './working-spaces.page.html',
  styleUrls: ['./working-spaces.page.scss'],
})
export class WorkingSpacesPage implements OnInit {
  workingSpaces:any[]=[]
  constructor(private route:ActivatedRoute,public ownerservice:OwnerServiceService,public account:SignInSignUpService) { 
  
    firebase.firestore().collectionGroup("space")
    
    .get()
    .then(snap => {
      snap.forEach(dat=>{
        this.workingSpaces.push( Object.assign(dat.data(),{'spaceId':dat.id}) )
      
      })
    })
  }

  ngOnInit() {
  }

}


