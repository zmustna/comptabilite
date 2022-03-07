import { UserserviceService } from './../../AppServices/UserServices/userservice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserGlobalService } from '../../AppServices/ServiceGlobal/UserGlobalService';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading=false;shower:any;resultx: string[] = [];
  constructor(private Spinner: NgxSpinnerService, private userservice: UserserviceService, private snackbar: MatSnackBar, private router:Router, private serviceglobal: UserGlobalService) { }
  loginForm: FormGroup;
  ngOnInit() {
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
      this.router.navigateByUrl('/');
    }
    this.loginForm=new FormGroup({
      Email : new FormControl(null,[Validators.email,Validators.required]),
      Password : new FormControl(null,[Validators.required,Validators.minLength(6)]),
    });
  }

  get Email(){
    return this.loginForm.get('Email') as FormControl;
  }
  get Password(){
    return this.loginForm.get('Password') as FormControl;
  }

  OpenResetPasswordDialog(){

  }

  onsubmit(){
    if(this.loginForm.valid){
      this.loading=true;
      this.userservice.login(this.loginForm.value)
      .subscribe(
        (data:any) => {
          if(data.message == "Please Activate your Account by Confirming your Email!"){
            this.snackbar.open(data.message, 'close me', {
              //duration:5000,
              horizontalPosition:'center',
              verticalPosition:'top'
            })
            this.snackbar._openedSnackBarRef.onAction().subscribe(()=>{
              this.loading=false;
            })
          }else if(data.message=="Invalid Email or Password!"){
            this.snackbar.open(data.message, 'close me', {
              //duration:5000,
              horizontalPosition:'center',
              verticalPosition:'top'
            })
            this.snackbar._openedSnackBarRef.onAction().subscribe(()=>{
              this.loading=false;
            })
          }else{
            this.snackbar.open(data.message, '?', {
              duration:5000,
              horizontalPosition:'center',
              verticalPosition:'top'
            }),
            localStorage.setItem('userToken',data.token),
            this.serviceglobal.emailuser = this.loginForm.value.Email;
            localStorage.setItem('useremail',this.serviceglobal.emailuser);
            this.GetUserCompanydefaultGlobal();
            //console.log(JSON.parse(window.atob(localStorage.getItem('userToken').split('.')[1])));
            //localStorage.setItem('userID',data.status),
            this.router.navigate(['/'])
          }
        }
      )
    }
  }
  GetUserCompanydefaultGlobal(){
    let res = new Array<any>(); res.push('id'); res.push(this.serviceglobal.emailuser);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.serviceglobal.getList("/EmailUserGlobalRepo/GetByEmailUserRepoIdId", this.resultx)
    .subscribe(
      (data:any) => {
        console.log(this.serviceglobal.emailuser + "  " + data[0]["companyGlobalId"]);
        localStorage.setItem('CompanyGlobalId',data[0]["companyGlobalId"]);
        this.GetUserCompanydefault();
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
  GetExercice(){
    let res = new Array<any>(); res.push('id'); res.push(localStorage.getItem('companycode'));
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.serviceglobal.getList("/ExerciceSociete/GetAllExercice", this.resultx)
    .subscribe(
      (data:any) => {
       localStorage.setItem('exercicecompany',data[0]["annee"]);
        window.location.reload();
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
GetUserCompanydefault(){
   // alert("pass 3");
    let res = new Array<any>(); res.push('id'); res.push(this.serviceglobal.emailuser);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.serviceglobal.getList("/UserCompany/GetUsersCompanyId", this.resultx)
    .subscribe(
      (data:any) => {
        this.serviceglobal.companyname=data[0]["companyName"];
        localStorage.setItem('namecompany',this.serviceglobal.companyname);
        localStorage.setItem('companycode',data[0]["companyId"]);
        this.GetExercice();

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
}

