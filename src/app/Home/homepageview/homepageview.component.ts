import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginandsignuppartialviewComponent } from 'src/app/User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from 'src/app/User/logoutpartialview/logoutpartialview.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { HomeserviceService } from '../../AppServices/HomeServices/homeservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { faCoffee, faUserFriends, faCogs, faFolderOpen, faPencilAlt, faBookReader , faAlignCenter, faDatabase, faBug} from '@fortawesome/free-solid-svg-icons';
import { faPollH, faTools} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { UserGlobalService } from '../../AppServices/ServiceGlobal/UserGlobalService';
library.add(fas, far);
@Component({
  selector: 'app-homepageview',
  templateUrl: './homepageview.component.html',
  styleUrls: ['./homepageview.component.scss']
})
export class HomepageviewComponent implements OnInit {
  menugen:any;
  resultx: string[]=[];
  constructor( private service: UserGlobalService, private Spinner: NgxSpinnerService, private router:Router,private hell:HomepageComponent, private homeservice: HomeserviceService, private snackbar:MatSnackBar) { }
  faCoffee = faCoffee;faCogs=faCogs;faFolderOpen = faFolderOpen;faPencilAlt = faPencilAlt;faBookReader=faBookReader;
  faAlignCenter=faAlignCenter;faDatabase=faDatabase;
  faUserFriends=faUserFriends;favvug=faBug;faPollH=faPollH;faTools=faTools;
  ngOnInit() {
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
      this.router.navigateByUrl('/');
    }
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
      this.hell.shower=LogoutpartialviewComponent;
      this.callmenunew();
    }else{
      this.hell.shower=LoginandsignuppartialviewComponent;

    }
  }
callmenunew(){
  let res = new Array<any>(); res.push('id'); res.push(localStorage.getItem('useremail'));
  res.push('CompanyId'); res.push(localStorage.getItem('companycode'));
  this.resultx = []; this.resultx = res;
  this.Spinner.show();
    this.service.getList("/UserMenu/GetUserMenufilter", this.resultx)
  .subscribe(
    (data:any) => {
      this.menugen=data;
      this.Spinner.hide();
    },
    (err:any)=>{
      this.Spinner.hide();
      this.snackbar.open('You are not Authorized Person to see Company!','?', {
        duration:4000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
    }
  )
}
 callmenu()
  {
    //alert("pass 10 : " + localStorage.getItem('namecompany') );
    this.Spinner.show();
    const tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('userToken')});
    this.homeservice.MenuGlobal(tokenHeader)
    .subscribe(
      (data:any) => {
        this.menugen=data;
        this.Spinner.hide();
      },
      (err:any)=>{
        this.Spinner.hide();
        this.snackbar.open('You are not Authorized Person to see list!','?', {
          duration:4000,
          horizontalPosition:'center',
          verticalPosition:'top'
        })
      }
    )

  }
}
