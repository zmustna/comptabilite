import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserGlobalService } from '../../../../AppServices/ServiceGlobal/UserGlobalService';
import { ToastrService } from 'ngx-toastr';
import { LogoutpartialviewComponent } from '../../../../User/logoutpartialview/logoutpartialview.component';
import { LoginandsignuppartialviewComponent } from '../../../../User/loginandsignuppartialview/loginandsignuppartialview.component';
import { EmailUser } from '../../../../Models/EmailUser';
import { companyUser } from '../../../../Models/companyUser';
import { UserMenuTable } from 'src/app/Models/UserMenuTable';
import { UserSousMenu } from 'src/app/Models/UserSousMenu';

@Component({
  selector: 'app-userandsmenu',
  templateUrl: './userandsmenu.component.html',
  styleUrls: ['./userandsmenu.component.scss']
})
export class UserandsmenuComponent implements OnInit {
  resultSettingap:Email[]=[];Second:any;selectedEmail: Email;  shower:any;username:string="";useremail:string;
  resultCompany:string[]=[];result: any;display:boolean;resultMenu: any;
  resultUser:string[]=[];Menuname:string="";Menuusercode:number=0;
  companyuserclick:string="";companyuserclickcode:number=0;checked:boolean=false;checkeddef:boolean=false;
  selectedCar1: companyUser;resultx: string[] = []; loading: boolean;menuId:number=0; resultMenunew:string[]=[];
  resultUsernew:string[]=[];
  cols = [
      { field: 'emailUserGlobalId', header: 'Id', display: 'none' },
      { field: 'companyGlobalId', header: 'Id', display: 'none' },
      { field: 'emailUserGlobalEmail', header: 'Email', width: '100%', display: 'table-cell',  align: 'left', size: '0.8em' }
  ];
  colscompany = [
    { field: 'companyId', header: 'Id', display: 'none' },
      { field: 'companyName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyActive', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  colsuser = [
    { field: 'userId', header: 'Id', display: 'none' },
    { field: 'menuId', header: 'MenuId', display: 'none' },
      { field: 'companyName', header: 'Menu', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'enableCompany', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  colsusernew = [
    { field: 'userId', header: 'Id', display: 'none' },
    { field: 'sousMenuId', header: 'MenuId', display: 'none' },
    { field: 'menuId', header: 'MenuId', display: 'none' },
    { field: 'companyId', header: 'MenuId', display: 'none' },
      { field: 'sousMenuname', header: 'Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'enableSousMenu', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  colsMenu = [
    { field: 'menuId', header: 'Id', display: 'none' },
      { field: 'menuName', header: 'Menu', width: '100%', display: 'table-cell',  align: 'left', size: '0.8em'}
   ];
   colsMenunew = [
    { field: 'sousMenuId', header: 'Id', display: 'none' },
      { field: 'sousMenuname', header: 'Sous Menu', width: '100%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'menuId', header: 'Id', display: 'none' },
      { field: 'enableSous', header: 'Id', display: 'none' },
   ];
  colsusercompany = [
    { field: 'userId', header: 'Id', display: 'none' },
      { field: 'companyId', header: 'iid',display: 'none'},
      { field: 'companyName', header: 'Comapany', width: '60%', display: 'table-cell',  align: 'left', size: '0.8em' },
      { field: 'enableCompany', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' },
      { field: 'bydefault', header: 'Default', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  codeSid: any;
  displaysousmenu: boolean;
  Menuusercode1: any;

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
  selectrow(e) {
     this.username=e.data.emailUserGlobalEmail;this.useremail=e.data.emailUserGlobalEmail;
     this.companyuserclick = "";this.companyuserclickcode=0;this.resultUser=[];
     this.getcompanyUser();
  }
  selectrowchoose(e) {
  this.companyuserclick = e.data.companyName;this.companyuserclickcode = e.data.companyId;
  this.loading = true;
  let fiile = new EmailUser(); let i = 0;
 fiile.CompanyId = this.companyuserclickcode ;fiile.UserId = this.useremail;
fiile.EnableCompany = 1;fiile.CompanyName = this.companyuserclick;
fiile.Bydefault =0; fiile.CompanyGlobalId =parseInt(localStorage.getItem('CompanyGlobalId'));
this.GetUserMenu();

 }
 selectrowmenus(e) {
  this.loading = true;
   let fiile = new UserSousMenu(); let i = 0;
  fiile.SousMenuId = e.data.sousMenuId;fiile.UserId = this.useremail;
  fiile.SousMenuname = e.data.sousMenuname;fiile.MenuId = e.data.menuId;
 fiile.EnableSousMenu= 1;fiile.CompanyId=this.companyuserclickcode;
 this.service.ExecutePost("/UserSousMenu/Update", fiile).subscribe(() => {
  if (i === 0) {
    i = 1;
 this.GetsMenuuser();
 this.loading = false;
    this.toastr.success('Updated Data ', 'Update');
  } else {
    this.loading = false;
  }

}, err =>  console.error(err))

}
GetsMenuuser(){
  let res = new Array<any>(); res.push('id'); res.push(this.useremail);
  res.push('Sid'); res.push(this.codeSid);
  res.push('CompanyId'); res.push(this.companyuserclickcode);
  this.resultx = []; this.resultx = res;
  this.Spinner.show();
    this.service.getList("/UserSousMenu/GetUserSousMenu", this.resultx)
  .subscribe(
    (data:any) => {
      this.resultUsernew=data;
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
 selectrowmenu(e) {
      this.loading = true;let fiile = new UserMenuTable(); let i = 0;this.menuId=e.data.menuId;
      fiile.MenuId = e.data.menuId;fiile.userId = this.useremail;
     fiile.EnableMenu = 1;fiile.CompanyId = this.companyuserclickcode;this.codeSid =e.data.menuId;
    this.service.ExecutePost("/UserMenu/Update", fiile).subscribe(() => {
      if (i === 0) {
        i = 1;
        this.GetsMenuuser();this.GetsMenu();
    this.loading = false;
        this.toastr.success('Updated Data ', 'Update');
      } else {
        this.loading = false;
      }

    }, err =>  console.error(err))

}
 GetUserMenu(){
  let res = new Array<any>(); res.push('id'); res.push(this.useremail);
  res.push('CompanyId'); res.push(this.companyuserclickcode);
  this.resultx = []; this.resultx = res;
  this.Spinner.show();
    this.service.getList("/UserMenu/GetUserMenu", this.resultx)
  .subscribe(
    (data:any) => {
      this.resultUser=data;
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
 onCheckboxChange(e){
  this.checked=e.target.checked;
}
onCheckboxChangedef(e){
  this.checkeddef=e.target.checked;
}
savedatasousmenu(){
  this.loading = true;
  let fiile = new UserSousMenu(); let i = 0;
 fiile.SousMenuId = this.Menuusercode1;fiile.UserId = this.useremail;
 fiile.SousMenuname = this.Menuname;fiile.MenuId = this.menuId;
 if(this.checked == true){fiile.EnableSousMenu =1;}else{fiile.EnableSousMenu = 0;}
 fiile.CompanyId=this.companyuserclickcode;
this.service.ExecutePost("/UserSousMenu/Update", fiile).subscribe(() => {
 if (i === 0) {
   i = 1;
this.GetsMenuuser();
this.loading = false;this.displaysousmenu= false;
   this.toastr.success('Updated Data ', 'Update');
 } else {
   this.loading = false;
   this.displaysousmenu= false;
   }

}, err =>  console.error(err))

}
savedata(){
  this.loading = true;
     let fiile = new UserMenuTable(); let i = 0;
    fiile.CompanyId = this.companyuserclickcode; fiile.userId = this.useremail;
    if(this.checked == true){fiile.EnableMenu =1;}else{fiile.EnableMenu = 0;}
    fiile.MenuId = this.Menuusercode;

  this.service.ExecutePost("/UserMenu/Update", fiile).subscribe(() => {
    if (i === 0) {
      i = 1;
   this.GetUserMenu();
   this.display=false;
   this.loading = false;
      this.toastr.success('Updated Data ', 'Update');
    } else {
      this.loading = false;
    }

  }, err =>  console.error(err))
}
  selectrowcompany(e) {
    this.Menuname = e.data.companyName;this.Menuusercode = e.data.bydefault;
    if(e.data.enableCompany == 0){this.checked = false;}else{this.checked = true;}
    this.display=true;

 }
 selectrowsousmenu(e) {
  this.Menuname = e.data.sousMenuname;this.Menuusercode1 = e.data.sousMenuId;
  if(e.data.enableSousMenu == 0){this.checked = false;}else{this.checked = true;}
  this.displaysousmenu=true;
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
  GetMenu() {
    this.Spinner.show();
     this.service.getResult("/Menu/GetAll")
    .subscribe(
      (data:any) => {
        this.resultMenu=data;
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
  GetsMenu() {
    //localStorage.setItem('sousmenu',1);
    let res = new Array<any>(); res.push('SousMenuId'); res.push(this.menuId);

    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/SousMenu/GetBySousMenuId", this.resultx)
    .subscribe(
      (data:any) => {
        this.resultMenunew=data;
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
  GetUsernew() {
    let res = new Array<any>(); res.push('id'); res.push(localStorage.getItem('CompanyGlobalId'));
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/EmailUserGlobalRepo/GetByEmailUserRepoId", this.resultx)
    .subscribe(
      (data:any) => {
        console.log(localStorage.getItem('CompanyGlobalId') + JSON.stringify(data));
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
  GetMenuUser() {
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
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
       this.shower=LogoutpartialviewComponent;
    }else{
       this.shower=LoginandsignuppartialviewComponent;
    }
    this.GetUsernew();
  this.GetCompany();this.GetMenu();
  }

}
interface Email {
  userFullName: string,
  email:string

}
