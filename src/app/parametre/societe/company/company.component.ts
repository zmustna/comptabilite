import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
import { companyUser } from 'src/app/Models/companyUser';
import { LoginandsignuppartialviewComponent } from 'src/app/User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from 'src/app/User/logoutpartialview/logoutpartialview.component';
import { EmailUser } from '../../../Models/EmailUser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  cols = [
    { field: 'companyId', header: 'Id', display: 'none' },
      { field: 'companyName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
      { field: 'companyActive', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' },
      { field: 'companyGlobalId', header: 'Iid', display: 'none'}
  ];
  shower:any;

  @ViewChild('namex') nameElement: ElementRef;
  selectedCar1: companyUser;
  codeid: number = 0;
    angForm: FormGroup; userDetails;
  loading: boolean;
  result: any; resultx: string[] = [];
  url: string;
    username: any;
  standarCompany: any;
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.createForm();
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
      fiile.CompanyName = this.angForm.value.name; fiile.CompanyId = this.codeid;
      fiile.CompanyGlobalId = this.standarCompany;
      if(this.angForm.value.checked == false){
      fiile.CompanyActive =0;
      }else{
        fiile.CompanyActive =1;
      }

    this.service.ExecutePost("/CompanyUser/Update", fiile).subscribe(() => {
      if (i === 0) {
        this.angForm.reset(); this.codeid = 0; this.getcompanyUser();
        this.loading = false;
    //this.updateuseremail();
        this.loading = false;

      } else {

      }

    }, err => console.error(err));
  }
  updateuseremail(){
    this.loading = true; let fiile = new EmailUser(); let i = 0;
      fiile.CompanyName = this.angForm.value.name; fiile.CompanyId = this.codeid;
      fiile.Bydefault=0; fiile.UserId = localStorage.getItem('useremail');

      if(this.angForm.value.checked == false){
      fiile.EnableCompany =0;
      }else{
        fiile.EnableCompany =1;
      }

    this.service.ExecutePost("/UserCompany/Update", fiile).subscribe(() => {
      if (i === 0) {
        i = 1;
      this.angForm.reset(); this.codeid = 0; this.getcompanyUser();
        this.loading = false;
        this.toastr.success('Updated Data ', 'Update');
      } else {

      }

    }, err => console.error(err));
  }

  getcompanyUser(){
    let res = new Array<any>(); res.push('id'); res.push(this.standarCompany);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/UserCompany/GetUsersCompanypara", this.resultx)
    .subscribe(
      (data:any) => {
        this.result = [];
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
    ngOnInit() {
      this.standarCompany = localStorage.getItem('CompanyGlobalId');
      if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
      {
         this.shower=LogoutpartialviewComponent;
      }else{
         this.shower=LoginandsignuppartialviewComponent;
      }
      Promise.resolve('done')
        .then((val) => { this.getcompanyUser();})
        .then((val) => { })
        .catch((err) => console.error(err));

  }

}
