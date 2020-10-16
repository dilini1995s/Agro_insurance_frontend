import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { ToastController,LoadingController,AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
@Component({
  selector: 'app-policies',
  templateUrl: './policies.page.html',
  styleUrls: ['./policies.page.scss'],
})
export class PoliciesPage implements OnInit {
  cameradata:string;
  base64Image:string
  Start_date:string;
  End_date:string;
  datastorage:any;
  hideMe=false;
  size:number;
  district:string;
  land_num:string;
  gramasewa_division:string;
  crop:string;
  owership:string;
  NIC:string;
  risk:string;
  constructor(private router:Router,private camera: Camera,public actionSheetController: ActionSheetController,
    private toastCtrl:ToastController, private acessPr:AccessProviders,
    private storage:Storage) { 


  }

  ngOnInit() {
    this.storage.get('storage_co').then((res)=>{
      console.log(res);
      this.datastorage=res;
      if(res==0){
        this.hideMe=true;
       
     }
      //this.name=this.datastorage.Name;
     // console.log(this.datastorage);
    });
    this.storage.get('storage_XXX').then((res)=>{
      console.log(res);
      this.datastorage=res;
      this.NIC=this.datastorage.NIC;
      console.log(this.NIC);
    });
    
  }
 back(){
    this.router.navigate(['/home/tab2']);
  }
  submit(){
    if(this.land_num==""){
      this.presentToast("land_num is required");
    }else if(this.gramasewa_division==""){
    this.presentToast("gramasewa_division is required");
    }else if(this.district=="")
    {
    this.presentToast("district is required");
   }else if(this.crop=="")
    {
      this.presentToast("crop is required");
    }else if(this.size==null)
    {
      this.presentToast("size is required");
    }
    else{
    //this.disableButton=true;
    // const loader=await this.loadingCtrl.create({
    //     message:'Please wait......',
    // });
    //loader.present();
      return new Promise(resoler=>{
        let body={
          
          land_num:this.land_num,
          gramasewa_division:this.gramasewa_division,
          district:this.district,
          crop:this.crop,
          owership:this.owership,
          size:this.size,
          nic:this.NIC,
          End_date:this.End_date,
          Start_date:this.Start_date,
          risk:this.risk

        }
        this.acessPr.postPolicy(body).subscribe((res:any)=>{
            if(res.status==true){
              //loader.dismiss();
             // this.disableButton=false;
              //this.presentToast(res.message);
              this.router.navigate(['/home/tab2']);

            }else{
              //loader.dismiss();
              //this.disableButton=false;
             // this.presentToast(res.message);
            }
        },(err=>{
          //loader.dismiss();
         // this.disableButton=false;
         // this.presentAlert('Timeout');
        }));
      });

    
  }
  
  }
  async presentToast(a) {
    let toast = await this.toastCtrl.create({
      message: a,
      duration: 3000,
      position: 'top'
    });
  toast.present();
  }
  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.cameradata=imageData;
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.cameradata=imageData;
   this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
    
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'choice media',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'camera',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
         this.openCamera();
        }
      }, {
        text: 'Gallery',
        icon: 'camera',
        handler: () => {
          this.openGallery();
        }
      }
      ]
    });
    await actionSheet.present();
  }
  add(){
    let body={
      images:this.cameradata
    };
  
  }

}