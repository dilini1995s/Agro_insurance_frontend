import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient,HttpHeaders,HttpErrorResponse}  from '@angular/common/http';
import { AccessProviders } from '../../providers/access-providers';
import { ToastController,LoadingController,AlertController,NavController } from '@ionic/angular';
@Component({
  selector: 'app-agent',
  templateUrl: './agent.page.html',
  styleUrls: ['./agent.page.scss'],
})
export class AgentPage implements OnInit {
datastorage:any;
id:any;
data:any;
va:any;
agent_id:any;
Name:any;
data1:any;
verify:any;
i:any;
request: string = "summary";
  constructor(private router:Router, private storage:Storage,public http:HttpClient,
    private toastCtrl:ToastController, private navCtrl:NavController) {
    this.doRefresh(0);
   }

  ngOnInit() {
  }
  view(event){
    this.va=event.target.id;
    this.storage.set('storage_info',this.va);
    console.log(this.va);
    this.router.navigate(['/agent-verification']);
  }
  doRefresh(event) {
  this.storage.get('storage_agent').then((res)=>{
      console.log(res);
      this.datastorage=res;
      this.Name=res.Name;
      this.id=this.datastorage.company_id;
      this.agent_id= this.datastorage.id;
      console.log(this.id);
      console.log(this.agent_id);
      this. getpolicy();
      this.getpolicydetails();
    });
    setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
        }, 2000);
  }
  
  getpolicy(){
    this.http.get(AccessProviders.server+'/agent/'+this.agent_id+'/'+this.id).subscribe((res:any)=>{ 
          this.data=res.message;
       })
      
  }
  getpolicydetails(){
    this.http.get(AccessProviders.server+'/policyapplyhistory/'+this.agent_id+'/'+this.id).subscribe((res:any)=>{ 
          this.data1=res.message;
          for(this.i in res.message){
            if(res.message[this.i].agent_verification==0){
              this.verify=false;
            }
            else
            this.verify=true;
          }
         
       })
      
  }
  back(){

    this.router.navigate(['/login']);
  }
  async processLogout(){
    this.storage.clear();
    this.navCtrl.navigateRoot('/welcome');
    const toast = await this.toastCtrl.create({
      message: 'logout successfully',
      duration: 3000,
      position: 'top'
    });
  toast.present();
  }
}
