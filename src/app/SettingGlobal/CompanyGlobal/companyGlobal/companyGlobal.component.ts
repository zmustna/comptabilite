import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
import { ToastrService } from 'ngx-toastr';
import { companyUser } from '../../../Models/companyUser';
import { LogoutpartialviewComponent } from '../../../User/logoutpartialview/logoutpartialview.component';
import { LoginandsignuppartialviewComponent } from '../../../User/loginandsignuppartialview/loginandsignuppartialview.component';
import {CompanyGlobalTable} from '../../../Models/CompanyGlobalTable';
import { JsonpClientBackend } from '@angular/common/http';
@Component({
  selector: 'app-companyGlobal',
  templateUrl: './companyGlobal.component.html',
  styleUrls: ['./companyGlobal.component.scss']
})
export class CompanyGlobalComponent implements OnInit {
  cols = [
    { field: 'companyGlobalId', header: 'Id', display: 'none' },
      { field: 'companyGlobalName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyEnable', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
   shower:any;

  @ViewChild('namex') nameElement: ElementRef;
  selectedCar1: companyUser;
  codeid: number = 0;codegolbal:number=0;
    angForm: FormGroup; userDetails;
  loading: boolean;
  result: any; resultx: string[] = [];
  url: string;resultSettingap:string[]=[];selectedEmail: Email;
    username: any;
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.setMenu(); this.createForm();
  }
  setMenu(){
    localStorage.setItem('sousmenu','10');
  }
  createForm() {
    this.angForm = this.fb.group({
        name: ['', Validators.required],
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
  selectrow(e) {
      this.angForm.setValue({ name: e.data.companyGlobalName, checked: e.data.companyEnable });
    this.codeid = e.data.companyGlobalId;
    this.nameElement.nativeElement.focus();
  }
  onSubmit() {
    this.loading = true; let fiile = new CompanyGlobalTable(); let i = 0;
      fiile.CompanyGlobalName = this.angForm.value.name; fiile.CompanyGlobalId = this.codeid;
      if(this.angForm.value.checked == false){
      fiile.CompanyEnable =0;
      }else{
        fiile.CompanyEnable =1;
      }

    this.service.ExecutePost("/CompanyGlobalTable/Update", fiile).subscribe(() => {
      if (i === 0) {
        i = 1;
      this.angForm.reset(); this.codeid = 0; this.Getdealer();
        this.loading = false;
        this.toastr.success('Updated Data ', 'Update');
      } else {

      }

    }, err => console.error(err));
  }

  Getdealer() {
    this.Spinner.show();
     this.service.getResult("/CompanyGlobalTable/GetAllCompanyGlobalTable")
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
        .then((val) => { this.Getdealer();})
        .then((val) => {this.GetUser() })
        .then((val) => {this.setMenu()})
        .catch((err) => console.error(err));

  }

}
interface Email {
  userFullName: string,
  email:string

}
