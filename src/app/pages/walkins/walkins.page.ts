import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular/providers/alert-controller';
import { LoadingController } from '@ionic/angular/providers/loading-controller';
import { OwnerServiceService } from 'src/app/services/owner.service';
import { SignInSignUpService } from 'src/app/sign-in-sign-up.service';
import {  PopoverController } from '@ionic/angular';
import { MassegesPage } from 'src/app/feedback/masseges/masseges.page';
@Component({
  selector: 'app-walkins',
  templateUrl: './walkins.page.html',
  styleUrls: ['./walkins.page.scss'],
})
export class WalkinsPage implements OnInit {
  spaceuid = this.route.snapshot.params.spaceuid;
  category = this.route.snapshot.params.category;
  profileuid = this.route.snapshot.params.profileuid;
  constructor(private popover:PopoverController,public account:SignInSignUpService,private route:ActivatedRoute,public ownerservice:OwnerServiceService,private formBuilder:FormBuilder) { }
  walkinsForm = this.formBuilder.group({
    name:['', [Validators.required,Validators.maxLength(20),Validators.minLength(2),Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
    surname: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(2),Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    phone:  ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    checkin: ['', [Validators.required]],
    checkout: ['', [Validators.required]],
    timein: ['', [Validators.required]],
    timeout: ['', [Validators.required]]   
});


get checkin() {
  return this.walkinsForm.get("checkin");
}
get checkout() {
  return this.walkinsForm.get("checkout");
}
get timein() {
  return this.walkinsForm.get("timein");
}
get timeout() {
  return this.walkinsForm.get("timeout");
}
get name() {
  return this.walkinsForm.get("name");
}
get surname() {
  return this.walkinsForm.get("surname");
}
get email() {
  return this.walkinsForm.get("email");
}
get phone() {
  return this.walkinsForm.get("phone");
}
//this.reservationForm.value.timeout



walkinsBooking(){
 
this.ownerservice.walkinBooking(this.account.getUserSession(),this.profileuid,this.spaceuid,this.walkinsForm.value.name,
  this.walkinsForm.value.surname,this.walkinsForm.value.email,
  this.walkinsForm.value.phone,this.walkinsForm.value.timeout,this.walkinsForm.value.timein,
  this.walkinsForm.value.checkout,this.walkinsForm.value.checkin,this.category
    ) 
    this.CreatePopover()
}

isValidInput(fieldName): boolean {
  return this.walkinsForm.controls[fieldName].invalid &&
    (this.walkinsForm.controls[fieldName].dirty || this.walkinsForm.controls[fieldName].touched);
}

CreatePopover()
{
  this.popover.create({component:MassegesPage,
  showBackdrop:false}).then((popoverElement)=>{
    popoverElement.present();
  })
}

  ngOnInit() {
  }

}
