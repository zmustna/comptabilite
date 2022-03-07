import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
import { ToastrService } from 'ngx-toastr';
import { companyUser } from '../../Models/companyUser';
import { LogoutpartialviewComponent } from '../../User/logoutpartialview/logoutpartialview.component';
import { LoginandsignuppartialviewComponent } from '../../User/loginandsignuppartialview/loginandsignuppartialview.component';
import { userexercice } from 'src/app/Models/societe/userexercice';

@Component({
  selector: 'app-Userexercice',
  templateUrl: './Userexercice.component.html',
  styleUrls: ['./Userexercice.component.scss']
})
export class UserexerciceComponent implements OnInit {

  colsuser = [
    { field: 'emailUserGlobalId',  display: 'none'},
    { field: 'companyGlobalId',  display: 'none'},
    { field: 'emailUserGlobalEmail', header: 'Email', width: '60%', display: 'table-cell',  align: 'left', size: '0.8em' }
];
colsusersoc = [
  { field: 'userId', header: 'Email', width: '40%', display: 'table-cell',  align: 'left', size: '0.8em' },
  { field: 'soieteId',  display: 'none' },
  { field: 'raisonsocial', header: 'Societe', width: '40%', display: 'table-cell',  align: 'left', size: '0.8em' },
   { field: 'annee', header: 'Annee', width: '10%', display: 'table-cell',  align: 'left', size: '0.8em' },
  { field: 'bydefaultuse', header: 'Enable', width: '10%', display: 'table-cell',  align: 'left', size: '0.8em' }
];
colsusercompany = [
  { field: 'userId', header: 'Id', display: 'none' },
    { field: 'companyId', header: 'iid',display: 'none'},
    { field: 'companyName', header: 'Company', width: '60%', display: 'table-cell',  align: 'left', size: '0.8em' },
    { field: 'enableCompany', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' },
    { field: 'bydefault', header: 'Default', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' },
    { field: 'companyGlobalId', header: 'Id', display: 'none' },
];
  cols = [
    { field: 'societeId', header: 'Id', display: 'none' },
    { field: 'annee', header: 'Annee', width: '10%', display: 'table-cell',  align: 'left', size: '0.8em'},
    { field: 'bydefaultuse', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  cols0 = [
    { field: 'societeId', header: 'Id', display: 'none' },
    { field: 'companyId', header: 'Id', display: 'none' },
    { field: 'abreviation', header: 'Id', display: 'none' },
    { field: 'adresse', header: 'Id', display: 'none' },
    { field: 'ville', header: 'Id', display: 'none' },
    { field: 'pays', header: 'Id', display: 'none' },
    { field: 'tele', header: 'Id', display: 'none' },
    { field: 'fax', header: 'Id', display: 'none' },
    { field: 'tvadebit', header: 'Id', display: 'none' },
    { field: 'tvaEncai', header: 'Id', display: 'none' },
    { field: 'tvaigrs', header: 'Id', display: 'none' },
    { field: 'tvaigrn', header: 'Id', display: 'none' },
    { field: 'tvaisn', header: 'Id', display: 'none' },
    { field: 'tvaiss', header: 'Id', display: 'none' },
    { field: 'iff', header: 'Id', display: 'none' },
    { field: 'raisonsocial', header: 'Company Name', width: '30%', display: 'table-cell',  align: 'left', size: '0.8em'},
    { field: 'formjuridique', header: 'F.Juridique', width: '10%', display: 'table-cell',  align: 'center', size: '0.8em' },
    { field: 'rc', header: 'R.C', width: '10%', display: 'table-cell',  align: 'center', size: '0.8em' },
    { field: 'patente', header: 'Patente', width: '10%', display: 'table-cell',  align: 'center', size: '0.8em' },
    { field: 'cnss', header: 'CNSS', width: '10%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];

   shower:any;

  @ViewChild('namex') nameElement: ElementRef;
  selectedCar1: companyUser;
  codeid: number = 0;codegolbal:number=0;
    angForm: FormGroup; userDetails;
  loading: boolean;wtest:number=0;
  result: any; resultx: string[] = [];
  url: string;resultSettingap:string[]=[];selectedEmail: Email;
    username: any;companyId:number=0;
  standarCompany: string;wcompany: string;
  resultsoc: any;expression:boolean=false;
  resultCompany: any;
  resultsocuser: any;
  companysoc: any;
  wem: any;
  wsoc: any;
  wyear: any;
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.setMenu(); this.createForm();
  }
  GetUsernew() {
    let res = new Array<any>(); res.push('id'); res.push(this.standarCompany);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/EmailUserGlobalRepo/GetByEmailUserRepoId", this.resultx)
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
  setMenu(){
    localStorage.setItem('sousmenu','11');
  }
  createForm() {
    this.angForm = this.fb.group({
      annee: ['', Validators.required],
      checked: [false]
    });
  }
  selectrowglobal(e) {
       this.codegolbal = e.data.companyGlobalId;

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
  selectrowannee(e) {
    this.wyear =e.data.annee;
    if(this.wyear !== "" && this.wsoc !== "" && this.wem !=="" ){
        this.wtest = 1;
    }else{
      this.wtest = 0;
    }

}
selectrowuser(e) {
  this.username=e.data.emailUserGlobalEmail;this.useremail=e.data.emailUserGlobalEmail;
  this.wem =  e.data.emailUserGlobalEmail;
  this.wsoc="";this.wyear=""; this.wtest = 0;
     this.standarCompany = e.data.companyGlobalId;
     this.getcompanyUser();this.getcompuser();

}
getannee(){
  let res = new Array<any>(); res.push('id'); res.push(this.useremail);
  this.resultx = []; this.resultx = res;
  this.Spinner.show();
    this.service.getList("/EmailUserGlobalRepo/GetByEmailUserRepoId", this.resultx)
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
getcompusersoc(){
   let res = new Array<any>(); res.push('userid'); res.push(this.useremail);
  res.push('id'); res.push(this.companysoc);
  this.resultx = []; this.resultx = res;
  this.Spinner.show();
    this.service.getList("/UserExercice/GetAllUserExer", this.resultx)
  .subscribe(
    (data:any) => {
      this.resultsocuser=data;
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
getcompuser(){
  console.log(this.useremail);
  let res = new Array<any>(); res.push('userid'); res.push(this.useremail);
  this.resultx = []; this.resultx = res;
  this.Spinner.show();
    this.service.getList("/UserExercice/GetAllUser", this.resultx)
  .subscribe(
    (data:any) => {
      this.resultsocuser=data;
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
    this.wtest = 0;
    this.wcompany = e.data.raisonsocial;
    this.companyId = e.data.societeId;
    this.Getdealer();
  }
  onChange(e){
    console.log(this.expression);
  }

  onSubmit() {
    this.Spinner.show();
     let fiile = new userexercice(); let i = 0;
      fiile.annee = this.wyear;fiile.userId = this.wem;
      fiile.bydefaultuse = 0;
      fiile.societeId = this.companysoc;

    this.service.ExecutePost("/UserExercice/Update", fiile).subscribe(() => {
      if (i === 0) {
        i = 1;
      this.wtest = 0;
      this.wyear="";this.Spinner.hide();this.getcompusersoc();
        this.toastr.success('Updated Data ', 'Update');
      } else {

      }

    }, err => console.error(err));
  }
  onDelete(){

  }
  selectrowchoose(e) {
    this.wyear=""; this.wtest = 0;
    this.companyId = e.data.companyId;this.wsoc =e.data.companyName;
    this.Getdealer();

   }
  Getdealer() {
    let res = new Array<any>();
    this.Spinner.show();
     res.push('id'); res.push(this.companyId);
     this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/ExerciceSociete/GetAllExercice3", this.resultx)
    .subscribe(
      (data:any) => {
        this.result=data;
        if(this.result.length > 0){
           this.companysoc = this.result[0]["societeId"];
           this.getcompusersoc();
        }
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
  Getsocieteg() {
    let res = new Array<any>();
    this.Spinner.show();

    res.push('id'); res.push(this.standarCompany);
     this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/SocieteG/GetAllSocieteG", this.resultx)
    .subscribe(
      (data:any) => {
        this.resultsoc=data;
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
  useremail(useremail: any) {
    throw new Error('Method not implemented.');
  }
    ngOnInit() {
      this.standarCompany = localStorage.getItem('CompanyGlobalId');
      if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
      {
         this.shower=LogoutpartialviewComponent;
      }else{
         this.shower=LoginandsignuppartialviewComponent;
      }
      Promise.resolve('done')
        .then((val) => { this. GetUsernew();})
        .then((val) => {this.setMenu() })
        .catch((err) => console.error(err));

  }

}
interface Email {
  userFullName: string,
  email:string

}

