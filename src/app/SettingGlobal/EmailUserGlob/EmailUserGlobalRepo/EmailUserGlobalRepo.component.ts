import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserGlobalService } from '../../../AppServices/ServiceGlobal/UserGlobalService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { LogoutpartialviewComponent } from '../../../User/logoutpartialview/logoutpartialview.component';
import { LoginandsignuppartialviewComponent } from '../../../User/loginandsignuppartialview/loginandsignuppartialview.component';
import { companyUser } from '../../../Models/companyUser';
import { EmailUser } from 'src/app/Models/EmailUser';
import { EmailUserGlobalRepo } from 'src/app/Models/EmailUserGlobalRepo';

@Component({
  selector: 'app-EmailUserGlobalRepo',
  templateUrl: './EmailUserGlobalRepo.component.html',
  styleUrls: ['./EmailUserGlobalRepo.component.scss']
})
export class EmailUserGlobalRepoComponent implements OnInit {
  resultSettingap:Email[]=[];Second:any;selectedEmail: Email;  shower:any;username:string="";useremail:string;
  resultCompany:string[]=[];result: any;display:boolean;
  companyuserclick:string="";companyuserclickcode:number=0;checked:boolean=false;checkeddef:boolean=false;
  selectedCar1: companyUser;resultx: string[] = []; loading: boolean;

  @ViewChild('namex') nameElement: ElementRef;
  codeid: number = 0;
    angForm: FormGroup; userDetails;
  cols = [
    { field: 'companyGlobalId', header: 'Id',display: 'none'},
      { field: 'companyGlobalName', header: 'Company', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyEnable', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];

  colscompany = [
    { field: 'companyId', header: 'Id', display: 'none' },
      { field: 'companyName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyActive', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  colsusercompany = [
    { field: 'emailUserGlobalId', header: 'Id', display: 'none' },
      { field: 'companyGlobalId', header: 'iid',display: 'none'},
      { field: 'emailUserGlobalEmail', header: 'Email', width: '100%', display: 'table-cell',  align: 'left', size: '0.8em' },
      { field: 'companyGlobalName', header: 'iid',display: 'none'},
      { field: 'companyEnable', header: 'iid',display: 'none'},
  ];
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
        name: ['', Validators.required]

    });
  }
  onRowSelect(event) {

  }
  imprimer(){

  }
  onRowUnselect(event) {

  }
  onSubmit() {
    this.loading = true; let fiile = new EmailUserGlobalRepo(); let i = 0;
      fiile.EmailUserGlobalEmail = this.angForm.value.name; fiile.EmailUserGlobalId = this.codeid;
      fiile.CompanyGlobalId=this.companyuserclickcode;
     this.service.ExecutePost("/EmailUserGlobalRepo/Update", fiile).subscribe(() => {
      if (i === 0) {

    this.getcompanyUser();
        this.loading = false;
        this.angForm.reset(); this.codeid = 0;

      } else {

      }

    }, err => console.error(err));
  }
  getcompanyUser(){
    let res = new Array<any>(); res.push('id'); res.push(this.companyuserclickcode);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/EmailUserGlobalRepo/GetByEmailUserRepoId", this.resultx)
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
  selectrow(e) {
     this.username=e.data.companyGlobalName;this.companyuserclickcode=e.data.companyGlobalId;
     this.getcompanyUser();
  }
  selectrowchoose(e) {
    this.angForm.setValue({ name: e.data.emailUserGlobalEmail });
    this.codeid = e.data.emailUserGlobalId;
    this.nameElement.nativeElement.focus();
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
    fiile.CompanyName = e.data.CompanyName; fiile.CompanyId = e.data.companyId;
    fiile.Bydefault =0; fiile.EnableCompany = 1; fiile.UserId = this.useremail;

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
  GetUser() {
    this.Spinner.show();
     this.service.getResult("/CompanyGlobalTable/GetAllCompanyGlobalTable")
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
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
       this.shower=LogoutpartialviewComponent;
    }else{
       this.shower=LoginandsignuppartialviewComponent;
    }
    this.GetUser();

  }

}
interface Email {
  userFullName: string,
  email:string

}
