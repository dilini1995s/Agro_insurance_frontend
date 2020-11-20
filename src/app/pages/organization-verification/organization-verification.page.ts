import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient,HttpHeaders,HttpErrorResponse}  from '@angular/common/http';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-organization-verification',
  templateUrl: './organization-verification.page.html',
  styleUrls: ['./organization-verification.page.scss'],
})
export class OrganizationVerificationPage implements OnInit {
id:any;
data:any;
verifi:any;
va:any;
policy_num:any;
loss:any;
  constructor(private router:Router,private storage:Storage,public http:HttpClient,
    private acessPr:AccessProviders,) {

    this.storage.get('storage_info1').then((res)=>{
      this.id=res;
      console.log( res);
      this.http.get(AccessProviders.server+'/getclaim/'+this.id).subscribe((res:any)=>{ 
        this.data=res.message;
        this.policy_num=res.message[0].policy_number;
        this.loss=res.message[0].type_of_loss;
        console.log( this.data);
        this.http.get(AccessProviders.server+'/getlandforclaim/'+this.id+'/'+this.policy_num).subscribe((res:any)=>{ 
        
        this.storage.set('storage_landnumber',res.message[0].land_number);
        });
     })
    });
   }

  ngOnInit() {
  }

  onClick(){
    this.verify();
    
  }
  verify(){
    console.log(this.verifi);
    console.log(this.id);
    if(this.verifi=='True')
        this.va=1;
    else if(this.verifi=='False')
        this.va=0;
        
    return new Promise(resoler=>{
    
        let body={
          verify:this.va,
        }
          this.acessPr.postorgVerify(body,this.id).subscribe((res:any)=>{
            if(res.status==true){
                  this.router.navigate(['/organization']);
                  console.log('true');
            }else{
                  //loader.dismiss();
                  //this.disableButton=false;
                  // this.presentToast(res.message);
            }
        });
      });
  }
  location(){
    this.router.navigate(['/viewlocation']);
  }
}