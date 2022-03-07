import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginandsignuppartialviewComponent } from '../../../User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from '../../../User/logoutpartialview/logoutpartialview.component';
import { UserGlobalService } from '../../../AppServices/ServiceGlobal/UserGlobalService';
import { companyUser } from '../../../Models/companyUser';
import { EmailUser } from '../../../Models/EmailUser';
@Component({
  selector: 'app-MenuUserT',
  templateUrl: './MenuUserT.component.html',
  styleUrls: ['./MenuUserT.component.scss']
})
export class MenuUserTComponent implements OnInit {
  resultSettingap:Email[]=[];Second:any;selectedEmail: Email;  shower:any;username:string="";useremail:string;
  resultCompany:string[]=[];result: any;display:boolean;
  companyuserclick:string="";companyuserclickcode:number=0;checked:boolean=false;checkeddef:boolean=false;
  selectedCar1: companyUser;resultx: string[] = []; loading: boolean;
  cols = [
      { field: 'emailUserGlobalId',  display: 'none'},
      { field: 'companyGlobalId',  display: 'none'},
      { field: 'emailUserGlobalEmail', header: 'Email', width: '60%', display: 'table-cell',  align: 'left', size: '0.8em' }
  ];
  colscompany = [
    { field: 'companyId', header: 'Id', display: 'none' },
      { field: 'companyName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyActive', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  colsusercompany = [
    { field: 'userId', header: 'Id', display: 'none' },
      { field: 'companyId', header: 'iid',display: 'none'},
      { field: 'companyName', header: 'Comapany', width: '60%', display: 'table-cell',  align: 'left', size: '0.8em' },
      { field: 'enableCompany', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' },
      { field: 'bydefault', header: 'Default', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' },
      { field: 'companyGlobalId', header: 'Id', display: 'none' },
  ];
  standarCompany: any;
  codegolbal: any;

  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {

  }
  onRowSelect(event) {

  }

  onRowUnselect(event) {

  }

  getcompanyUser(){
    let res = new Array<any>(); res.push('id'); res.push(this.useremail);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/UserCompany/GetUsersCompany", this.resultx)
    .subscribe(
      (data:any) => {
        this.resultCompany=data;
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
  getcompanyGlobal(){
    let res = new Array<any>(); res.push('id'); res.push(this.codegolbal);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/UserCompany/GetUsersCompanypara", this.resultx)
    .subscribe(
      (data:any) => {
        this.result=data;
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
  selectrow(e) {
     this.username=e.data.emailUserGlobalEmail;this.useremail=e.data.emailUserGlobalEmail;
     this.codegolbal = e.data.companyGlobalId;
     this.getcompanyUser();this.getcompanyGlobal();
  }
  selectrowchoose(e) {
  this.companyuserclick = e.data.companyName;this.companyuserclickcode = e.data.companyId;
  if(e.data.enableCompany == 0){this.checked = false;}else{this.checked = true;}
  if(e.data.bydefault == 0){this.checkeddef = false;}else{this.checkeddef = true;}
  this.display=true;
 }
 onCheckboxChange(e){
  this.checked=e.target.checked;
}
onCheckboxChangedef(e){
  this.checkeddef=e.target.checked;
}
savedata(){
  this.loading = true;
     let fiile = new EmailUser(); let i = 0;
    fiile.CompanyName = this.companyuserclick; fiile.CompanyId = this.companyuserclickcode;
    if(this.checked == true){fiile.Bydefault =1;}else{fiile.Bydefault = 0;}
    if(this.checkeddef == true){fiile.EnableCompany =1;}else{fiile.EnableCompany = 0;}
    fiile.UserId = this.useremail;
if(this.checkeddef == true && this.useremail == localStorage.getItem('useremail')){
  localStorage.setItem('namecompany',this.companyuserclick);

}
  this.service.ExecutePost("/UserCompany/Updatenew", fiile).subscribe(() => {
    if (i === 0) {
      i = 1;
   this.getcompanyUser();
   this.display=false;
   this.loading = false;
   window.location.reload();
      this.toastr.success('Updated Data ', 'Update');
    } else {
      this.loading = false;
    }

  }, err =>  console.error(err))
}
  selectrowcompany(e) {
    this.loading = true;
     let fiile = new EmailUser(); let i = 0;
    fiile.CompanyName = e.data.companyName; fiile.CompanyId = e.data.companyId;
    fiile.Bydefault =0; fiile.EnableCompany = 1; fiile.UserId = this.useremail;
    fiile.CompanyGlobalId = this.standarCompany;

  this.service.ExecutePost("/UserCompany/Update", fiile).subscribe(() => {
    if (i === 0) {
      i = 1;
   this.getcompanyUser();
   this.loading = false;
      this.toastr.success('Updated Data ', 'Update');
    } else {
      this.loading = false;
    }

  }, err =>  console.error(err))

 }
  GetCompany() {
    this.Spinner.show();
     this.service.getResult("/CompanyUser/GetAllCompanyUser")
    .subscribe(
      (data:any) => {
        this.result=data;
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
  GetUsernew() {
    let res = new Array<any>(); res.push('id'); res.push(this.standarCompany);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getResult("/EmailUserGlobalRepo/GetAllEmailUserRepo")
    .subscribe(
      (data:any) => {
        this.resultSettingap=data;
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
  GetUser() {
    this.Spinner.show();
     this.service.getResult("/Account/GetUsers")
    .subscribe(
      (data:any) => {
        this.resultSettingap=data;
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
  ngOnInit() {
    this.standarCompany = localStorage.getItem('CompanyGlobalId');
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
       this.shower=LogoutpartialviewComponent;
    }else{
       this.shower=LoginandsignuppartialviewComponent;
    }
    this.GetUsernew();
 // this.GetCompany();
  }

}
interface Email {
  userFullName: string,
  email:string

}
