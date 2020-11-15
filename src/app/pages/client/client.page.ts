import { Component, OnInit } from '@angular/core';
import { IonicRatingModule } from 'ionic-rating';
import { Router,ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import { AccessProviders } from '../../providers/access-providers';
import {HttpClient,HttpHeaders,HttpErrorResponse}  from '@angular/common/http';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
data1:any;
data2:any;
data3:any;
id:any;
com:any;
policyid:any;
hide=false;
hid=false;
amount:any;
am:any;
policy:any;
  constructor(private router:Router, private storage:Storage,public http:HttpClient,
    private acessPr:AccessProviders) {
    this.storage.get('storage_afarmer').then((res)=>{
      this.id=res;
      
      this.http.get(AccessProviders.server+'/onefarmer/'+this.id).subscribe((res:any)=>{ 
      this.data1=res.message; 
          console.log(res.message);
         
        })
        this.http.get(AccessProviders.server+'/farmerspolicy/'+this.id+"/").subscribe((res:any)=>{ 
          this.data3=res.message; 
              console.log(res.message);
             
            })
        this.storage.get('storage_company').then((res)=>{
          this.com=res.id;
          this.http.get(AccessProviders.server+'/activepolicy/'+this.id+"/"+this.com).subscribe((res:any)=>{ 
            this.data2=res.message;
            this.am=res.message[0].PaidAmount;
                console.log(res.message);
                console.log( res.message[0].PaidAmount);
               
               
              })

        })  
      //this.name=this.datastorage.Name;
      //console.log(this.l1);
    });
  }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['/company/companytab4']);
  
  }
  show(){
    this.hide=true;
  }
  Click(event){
    this.policyid=event.target.id;
    this.hid=true;
    
  }
  update(){
    
    console.log(this.policyid);
    return new Promise(resoler=>{
      let body={
        amount:this.amount
        
       

      }
      this.acessPr.updateAmount(body,this.policyid).subscribe((res:any)=>{
          if(res.status==true){
            //loader.dismiss();
           // this.disableButton=false;
            //this.presentToast(res.message);
            //this.router.navigate(['/home/tab2']);
              console.log('true');
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
  rate(){
    this.router.navigate(['/rateuser']);
  }
}
