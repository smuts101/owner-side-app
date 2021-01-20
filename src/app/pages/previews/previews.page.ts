import { Component, OnInit, ViewChild } from '@angular/core';
import { SignInSignUpService } from 'src/app/sign-in-sign-up.service';
import firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import 'firebase/firestore';
import 'firebase/auth';
import { IonInfiniteScroll } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { OwnerServiceService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-previews',
  templateUrl: './previews.page.html',
  styleUrls: ['./previews.page.scss'],
})
export class PreviewsPage implements OnInit {



  uidprofiles = this.route.snapshot.params.uidprofiles;
  uidprofile = this.route.snapshot.params.uidprofile;
  uidspace= this.route.snapshot.params.uidspace;
  commentsList:any[]=[];
  constructor(private router: Router,private route:ActivatedRoute,public ownerservice:OwnerServiceService,public account:SignInSignUpService) {
    console.log(this.account.getUserSession())
firebase.firestore().collection("profiles")
.doc(this.uidprofiles)

.collection("profile").doc(this.uidprofile).collection("space").doc(this.uidspace).collection("previews").where("space_uid","==",this.uidspace).get().then(doc=>{
    

  doc.forEach(list=>{
      this.commentsList.push(list.data())  
      console.log(this.commentsList)
  })

}) }

ngOnInit() {
}
back(){
  this.router.navigateByUrl('previews');

}


 


}
