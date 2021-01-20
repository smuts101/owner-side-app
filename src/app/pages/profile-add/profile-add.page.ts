import { Component, OnInit, ViewChild } from '@angular/core';
import { SignInSignUpService } from 'src/app/sign-in-sign-up.service';
import firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import 'firebase/firestore';
import 'firebase/auth';
import { IonInfiniteScroll } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


import { ModalController } from '@ionic/angular';
import { OwnerServiceService } from 'src/app/services/owner.service';

import {  PopoverController } from '@ionic/angular';
import { MassegesPage } from 'src/app/feedback/masseges/masseges.page';

export interface Cartoon {
  id: number;
  name: string;
}

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.page.html',
  styleUrls: ['./profile-add.page.scss'],
})
export class ProfileAddPage implements OnInit {

  form: FormGroup;
  array:Array<any>=[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  useruid:any
  status:boolean = false;
  show:any
  
  imageError: string;
  isImageSaved: boolean;
  EditIsImageSaved: boolean;
  cardImageBase64: string;

  company_website_:any;
  social_media_:any;
  company_emaile_:any;
  company_name_:any;
  aboutus_:any;
  company_tel_:any;
  company_address_:any;
  editForm:boolean=false;
  outside_features:any=[]



  amenitie:any=[];
  amenitiesEdit:any=[]
  cartoonsData: Cartoon[] = [
    { id: 0, name: 'cameras' },
    { id: 1, name: 'guards' },
    { id: 2, name: 'water' },
    { id: 3, name: 'electricity'},
    { id: 4, name: 'parking'},
    { id: 5, name: 'gardens'},
    { id: 6, name: 'bicycles'},
    { id: 7, name: 'cafeteria'},
    { id: 8, name: 'gym'},
    { id: 9, name: 'cleaners'}
  ];

  onChange(name: string, isChecked: boolean) {
    const cartoons = (this.updateForm.controls.name as FormArray);
    
    if (isChecked) {
      cartoons.push(new FormControl(name));
      this.amenitie = cartoons;
      this.amenitiesEdit.push((name));
    } else {
      const index = cartoons.controls.findIndex(x => x.value === name);
      cartoons.removeAt(index);
    }
  }

  constructor(private popover:PopoverController, private formBuilder:FormBuilder,public ownerservice:OwnerServiceService,public account:SignInSignUpService) {
    firebase.firestore().collectionGroup("profile")
    .where("uid", "==", this.account.getUserSession())
    .get()
    .then(snap => {

      snap.forEach(doc => {
      this.array.push(Object.assign(doc.data(),{"profile_uid":doc.id}) )
      this.company_name_ = doc.data().company_name;
      this.company_tel_=doc.data().company_tel;
      this.company_address_=doc.data().company_address;
      this.company_website_=doc.data().company_website;
      this.social_media_=doc.data().social_media
      this.company_emaile_=doc.data().company_emaile;
      this.aboutus_=doc.data().aboutus;
      this.outside_features=(doc.data().outside_features)




      this.useruid=doc.id
      });
    });
   }

  updateForm = this.formBuilder.group({
    company_name:['', [Validators.required,Validators.maxLength(20),Validators.minLength(2)]],
    company_address: ['', [Validators.required]],
    company_tel: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    company_website: [''],
    social_media: [''],
    company_emaile:  ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    aboutus:['',[Validators.required,Validators.maxLength(20),Validators.minLength(2)]],
    name: this.formBuilder.array([]),
    nameAnim:[false, Validators.requiredTrue]
});

isValidInput(fieldName): boolean {
  return this.updateForm.controls[fieldName].invalid &&
    (this.updateForm.controls[fieldName].dirty || this.updateForm.controls[fieldName].touched);
}
get nameAnim() {
  return this.updateForm.get("nameAnim");
}
get aboutus() {
  return this.updateForm.get("aboutus");
}
get name() {
  return this.updateForm.get("name");
}

get company_address() {
  return this.updateForm.get("company_address");
}
get company_tel() {
  return this.updateForm.get("company_tel");
}
get company_website() {
  return this.updateForm.get("company_website");
}
get social_media() {
  return this.updateForm.get("social_media");
}
get company_emaile() {
  return this.updateForm.get("company_emaile");
}
get company_name() {
  return this.updateForm.get("company_emaile");
}


public errorMessages = {
  aboutus: [
    { type: 'required', message: 'aboutus is required' }
  ],
  name: [
    { type: 'required', message: 'name is required' }
  ],
  
  company_address: [ 
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Please enter a valid email address' }
  ],
  company_tel:[
    { type: 'required', message: 'company_tel is required' }
  ],
  company_website:[
    { type: 'required', message: 'company_website is required' }
  ],
  social_media:[
    { type: 'required', message: 'social_media is required' }
  ]
  ,
  company_emaile:[
    { type: 'required', message: 'company_emaile is required' }
  ]
  ,
  company_name:[
    { type: 'required', message: 'company_emaile is required' }
  ]
};

fileChangeEvent(fileInput: any) {



  this. imageError = null;
  if(fileInput.target.files && fileInput.target.files[0]){
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;   
      if(fileInput.target.files[0].size > max_size){
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }
      if (!allowed_types.includes( fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e:any)=>{
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs=> {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];
            console.log(img_height,img_width);
            if(img_height > max_height && img_width > max_width){
              this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
              return false;
            }else{
              const imgBase64Path = e.target.result;
              this.cardImageBase64 = imgBase64Path;
              this.isImageSaved = true;
             return this.cardImageBase64;
            }
          }
        }
      reader.readAsDataURL(fileInput.target.files[0])
  }

}

 submit() {
    console.log( this.updateForm.value.name
                )
   this.ownerservice.updateProfile(this.useruid, this.account.getUserSession(),this.updateForm.value.company_tel,this.updateForm.value.company_address,
                    this.updateForm.value.company_website,this.updateForm.value.social_media,
                    this.updateForm.value.company_emaile,this.updateForm.value.company_name,
                    this.cardImageBase64,this.updateForm.value.name,this.updateForm.value.aboutus)
                    this. CreatePopover()
     }
     editForms(){

      if(this.amenitiesEdit.length-1 >-1){
      
       this.ownerservice.editProfile(this.useruid, this.account.getUserSession(),
       this.company_tel_,this.company_address_,this.company_website_,
       this.company_emaile_,this.company_name_,this.amenitiesEdit,this.aboutus_
       )
       this. CreatePopover()
      }else{
        this.ownerservice.editProfile(this.useruid, this.account.getUserSession(),
        this.company_tel_,this.company_address_,this.company_website_,
        this.company_emaile_,this.company_name_,this.outside_features,this.aboutus_)
        this. CreatePopover()
       }
     }
   
     changeImage(){
      this.ownerservice.changeImg(this.useruid, this.account.getUserSession(),this.cardImageBase64) 
      this. CreatePopover()
    } 


    update(){
      this.editForm = true;
    } 
    editAll(){
      this.editForm = false;
    } 


  ngOnInit() {
  }
  CreatePopover()
  {
    this.popover.create({component:MassegesPage,
    showBackdrop:false}).then((popoverElement)=>{
      popoverElement.present();
    })
  }
}
