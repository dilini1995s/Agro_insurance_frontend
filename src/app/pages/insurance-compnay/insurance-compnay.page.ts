import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {HttpClient,HttpHeaders,HttpErrorResponse}  from '@angular/common/http';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-insurance-compnay',
  templateUrl: './insurance-compnay.page.html',
  styleUrls: ['./insurance-compnay.page.scss'],
})
export class InsuranceCompnayPage implements OnInit {
  va:string="";
  i:any;
  datastorage:any;
  data:any;
  data1:any;
  d:any;
  m1:any;
  m2:any;

  hide1=false;
  hide2=false;
  arr:any[]=[];

  constructor( 
        private router:Router,
        private storage:Storage, 
        public navCtrl:NavController,
        public http:HttpClient) {}

  ngOnInit() {
    this.show();
  }
  // doRefresh(event) {
  //   setTimeout(() => {
  //    console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }


//show company details
  show(){
    this.http.get(AccessProviders.server+'/company').subscribe((res:any)=>{
      
        for(this.i in res.message)
        this.data=res.message; console.log(res.message.types);
        this.arr=res.message[this.i].types.split(',');
        for(this.i in this.arr){
          console.log(this.arr[this.i]);
         }
       })
    }
    //check whether farmer's login or not
  tryLogin1(event){

    this.storage.get("storage_XXX").then((res)=>{
      if(res==null){
          this.navCtrl.navigateRoot('/login');
      }
    });
    this.router.navigate(['/home']);
    this.va=event.target.id;
    this.storage.set('storage_co',this.va);
    //this.doRefresh(0);
  }

  back(){
    this.router.navigate(['/types']);
  }
}
