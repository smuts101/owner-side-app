
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


export interface Cartoon {
  id: number;
  name: string;
}

@Component({
  selector: 'app-update-space',
  templateUrl: './update-space.page.html',
  styleUrls: ['./update-space.page.scss'],
})
export class UpdateSpacePage implements OnInit {

  enemity:any
  price:any
  extras:any={}
  extrasArray:any=[]

  arrayList:any=[]
  arrayEdit:any=[]
  category = this.route.snapshot.params.category;
  // cateuid = this.route.snapshot.params.cateuid;
  showFormvalue: number;
  spaceUid:any
  description_: any;
  address_: any;
  category_number_: any;
  price_: any;
  province_: any;
  amenities_: any=[];


  amenitiesEdit:any=[]
  cartoonsData: Cartoon[] = [
    { id: 0, name: 'lights' },
    { id: 1, name: 'guachairsrds' },
    { id: 2, name: 'aircon' },
    { id: 3, name: 'plugs'},
    { id: 4, name: 'kitchen'},
    { id: 5, name: 'sunlight'},
    { id: 6, name: 'toilet'},
    { id: 7, name: 'clean'},
    { id: 8, name: 'safety'},
    { id: 9, name: 'tv'},
    { id: 10, name: 'wifi'},
    { id: 11, name: 'microphone'},
    { id: 12, name: 'speakers'},
    { id: 13, name: 'phone'},
    { id: 14, name: 'desktop'},
    { id: 15, name: 'bin'}

  ];
  categories_: any;
  city_: any;

  



  imageError: string;
  isImageSaved: boolean;
  EditIsImageSaved: boolean;
  cardImageBase64: string;
  workspaceuid: string;

  GallaryStatusValue:any=0;
  gallaryArray:any=[]
  gallaryArraySize: number=-1;
  spaceid: string;
  extrasCart: number=0;

  onChange(name: string, isChecked: boolean) {
    this.amenitiesEdit.push((name));
    console.log(this.amenitiesEdit)
  }
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

//////////////Geolocation and Geocode//////////
public lat: any;
public lng: any;
showingCurrent: boolean = true;
addressLocation: string; 

  constructor(private nativeGeocoder: NativeGeocoder, private ngZone: NgZone,private popover:PopoverController,private route:ActivatedRoute,public ownerservice:OwnerServiceService,public account:SignInSignUpService) { 
   
   
   
    //this.checkGallary();
    firebase.firestore().collection("profiles")
    .doc(this.account.getUserSession())
    .collection("profile").doc(this.ownerservice.getWorkSpaceUID()).collection("space")
    .where("uid","==",this.account.getUserSession()).where("categories","==",this.category)
.get()
.then(doc => {

doc.forEach(dat=>{
this.arrayList.push(Object.assign(dat.data(),{"spaceuid":dat.id}))
this.workspaceuid=dat.id;

})
this.checkGallary(this.workspaceuid);
console.log(this.arrayList)
})



  }

  ngOnInit() {
  }
  EditForm(id){
    this.showFormvalue = 1;
    this.GallaryStatusValue=0
    this.spaceUid=id;
    console.log(this.spaceUid)


    console.log(this.category)
    firebase.firestore().collection("profiles")
    .doc(this.account.getUserSession())
    .collection("profile").doc(this.ownerservice.getWorkSpaceUID()).collection("space").doc(this.spaceUid)
    
.get()
.then(doc => {
  this.description_ = doc.data().description;
  this.address_=doc.data().address;
  this.category_number_=doc.data().category_number;
  this.price_=doc.data().price;
  this.province_ =doc.data().province;
  this.amenities_  =(doc.data().amenities);
  this.categories_ =doc.data().categories
  this.city_=doc.data().city;
  this.spaceid = doc.id
  console.log( this.amenities_)
})



}





updateSpace(){
 // console.log( this.description_+"/"+this.address_+"/"+this.category_number_+"/"+this.price_+"/"+this.province_+"/"+this.amenitiesEdit )
  this.ownerservice.updateCoworkingSpace(this.account.getUserSession(),this.ownerservice.getWorkSpaceUID(),this.spaceUid,this.categories_,this.category_number_,this.address_,this.price_,this.city_,this.province_,this.amenitiesEdit,this.description_) 
  this.CreatePopover()
}
close(){
  this.showFormvalue = 0;
}
remove(id){
  this.ownerservice.deleteSpace(this.account.getUserSession(),this.ownerservice.getWorkSpaceUID(),id) 
  this. CreatePopover()
}
changeImage(){
  
  this.ownerservice.changeImgSpace(this.account.getUserSession(), this.ownerservice.getWorkSpaceUID(), this.cardImageBase64,this.spaceUid)
  this.CreatePopover()
}

addExtrasToarray(){

  var extrasx = {
    anemenity:this.enemity,
    price: this.price
};

this.extrasArray.push(extrasx)
this.extrasCart=this.extrasArray.length
console.log(this.extrasArray)

}
addExtras(){
  this.ownerservice.extrasAmenities(this.account.getUserSession(), this.ownerservice.getWorkSpaceUID(), this.extrasArray,this.spaceUid)
}
addGallary(x){
  this.showFormvalue = 0;
  this.GallaryStatusValue=1;
  this.workspaceuid=x;
}
getSpaceUid(){
  return this.workspaceuid
}
uploadGallary(){
console.log(this.workspaceuid)
  this.ownerservice.addGallary(this.account.getUserSession(),this.ownerservice.getWorkSpaceUID(),this.workspaceuid, this.cardImageBase64)

}

checkGallary(valueuid){
  console.log(this.ownerservice.getWorkSpaceUID())
  console.log(this.account.getUserSession())
  console.log(valueuid)

  var db = firebase.firestore();
  var hotelsRef = db.collection("profiles").doc(this.account.getUserSession());
    hotelsRef.collection("profile").doc(this.ownerservice.getWorkSpaceUID())
             .collection("space").doc(valueuid)
             .collection("gallary").where("uid","==",this.account.getUserSession())
   .get().then(doc=>{
       doc.forEach(dat=>{
        this.gallaryArray.push(Object.assign(dat.data(),{'gallaryuid':dat.id}) )
        this.gallaryArraySize=this.gallaryArray.length-1
       })
   })
  }


  deleteImage(spaceuid,gallaryuid){
    var db = firebase.firestore();
    var hotelsRef = db.collection("profiles").doc(this.account.getUserSession());
      hotelsRef.collection("profile").doc(this.ownerservice.getWorkSpaceUID())
               .collection("space").doc(spaceuid)
               .collection("gallary").doc(gallaryuid).delete().then((res) => {
                 console.log("deleted")

      })
    
  }


CreatePopover()
{
  this.popover.create({component:MassegesPage,
  showBackdrop:false}).then((popoverElement)=>{
    popoverElement.present();
  })
}

//////////////Geolocation and Geocode//////////
async geocode() {
//  this.ownerservice.geoCodeLocation(this.account.getUserSession(), this.ownerservice.getWorkSpaceUID(),this.spaceUid,-26.2585,27.9014)
  if (this.addressLocation != "") {

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.forwardGeocode(this.addressLocation, options)
      .then((result: NativeGeocoderResult[]) => {
        this.ngZone.run(() => {
          this.lat = parseFloat(result[0].latitude);
          this.lng = parseFloat(result[0].longitude);
     
          this.ownerservice.geoCodeLocation(this.account.getUserSession(), this.ownerservice.getWorkSpaceUID(),this.spaceUid,this.lat,this.lng)
          //  geoCodeLocation(user_uid, profile_uid,cate_uid,lat,log)
          // this.myMap.triggerResize()
          //   .then(() => (this.myMap as any)._mapsWrapper.setCenter({ lat: this.lat, lng: this.lng }));
        })
        this.showingCurrent = false;
      })
      .catch((error: any) => console.log(error));
  }
  else {
    await Toast.show({
      text: 'Please add address to Geocode'
    });
  }
}
}


