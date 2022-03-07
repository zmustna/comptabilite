import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LogoutpartialviewComponent } from '../../User/logoutpartialview/logoutpartialview.component';
import { LoginandsignuppartialviewComponent } from '../../User/loginandsignuppartialview/loginandsignuppartialview.component';
import { companyUser } from '../../Models/companyUser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settingglobal',
  templateUrl: './settingglobal.component.html',
  styleUrls: ['./settingglobal.component.scss']
})
export class SettingglobalComponent implements OnInit {
  cols = [
    { field: 'companyId', header: 'Id', display: 'none' },
      { field: 'companyName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyActive', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  colsuser = [
    { field: 'companyGlobalId', header: 'Id', display: 'none' },
      { field: 'companyGlobalName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyEnable', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  shower:any;

  @ViewChild('namex') nameElement: ElementRef;
  selectedCar1: companyUser;
  codeid: number = 0;
    angForm: FormGroup; userDetails;
  loading: boolean;
  result: any; resultx: string[] = [];
  url: string;resultSettingap:string[]=[];
    username: any;
  codegolbal: number=0;selectedEmail: Email;
  nameoffice: any;
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
   this.setMenu();  this.createForm();
  }
  setMenu(){
    localStorage.setItem('sousmenu','10');
  }
  getcompanyUserglobal(){
    let res = new Array<any>(); res.push('CompanyUserId'); res.push(this.codegolbal);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/CompanyUser/GetByCompanyUserIdId", this.resultx)
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
  selectrowglobal(e){
    this.codegolbal = e.data.companyGlobalId;
    this.nameoffice = e.data.companyGlobalName; this.getcompanyUserglobal();
  }
  createForm() {
    this.angForm = this.fb.group({
        name: ['', Validators.required],
        checked: [false]
    });
  }

  ngAfterViewInit() {
    this.nameElement.nativeElement.focus();
  }
  deleteid() {

  }
  imprimer() {

  }
  onRowSelect(event) {

  }

  onRowUnselect(event) {

  }
  selectrow(e) {
      this.angForm.setValue({ name: e.data.companyName, checked: e.data.companyActive });
    this.codeid = e.data.companyId;
    this.nameElement.nativeElement.focus();
  }
  onSubmit() {
    this.loading = true; let fiile = new companyUser(); let i = 0;
      fiile.CompanyName = this.angForm.value.name; fiile.CompanyId = this.codeid;fiile.CompanyGlobalId= this.codegolbal;
      if(this.angForm.value.checked == false){
      fiile.CompanyActive =0;
      }else{
        fiile.CompanyActive =1;
      }

    this.service.ExecutePost("/CompanyUser/Update", fiile).subscribe(() => {
      if (i === 0) {
        i = 1;
      this.angForm.reset(); this.codeid = 0; this.getcompanyUserglobal();
        this.loading = false;
        this.toastr.success('Updated Data ', 'Update');
      } else {

      }

    }, err => console.error(err));
  }
  Getparam(){
    this.service.menuchoose = 1;
    console.log(this.service.emailuser);
    this.Spinner.show();
     let res = new Array<any>(); res.push('SousMenuId'); res.push(1);
    this.resultx = []; this.resultx = res; this.url = "/SousMenu/GetBySousMenuId";
    let observabledetail = this.service.getList(this.url, this.resultx);
    let subscriptiondetail = observabledetail.subscribe(res6 => {
      subscriptiondetail.unsubscribe();

    });
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
  Getdealer() {
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
        console.log(JSON.stringify(data));
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
      Promise.resolve('done')
        .then((val) => { })
        .then((val) => {this.GetUser()})
        .then((val) => {this.setMenu()})
        .catch((err) => console.error(err));

  }

}
interface Email {
  userFullName: string,
  email:string

}
