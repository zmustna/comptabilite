import { Component, OnInit } from '@angular/core';
import { LogoutpartialviewComponent } from '../../User/logoutpartialview/logoutpartialview.component';
import { LoginandsignuppartialviewComponent } from '../../User/loginandsignuppartialview/loginandsignuppartialview.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserGlobalService } from '../../AppServices/ServiceGlobal/UserGlobalService';
import { companyUser } from '../../Models/companyUser';
import { EmailUser } from '../../Models/EmailUser';
import { exercicecompany } from 'src/app/Models/base/exercicecompany';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  shower:any;companyName:string="";resultx: string[] = [];loading: boolean;
  display:boolean=false;resultCompany:string[]=[];selectedEmail: Email; selectedCar1: companyUser;
  resultCompanyexercice:string[]=[];fiilenew = new EmailUser();exercicecompany:any;
  resultexercice: any;
  wcompany: any;
  wcompanyid: any;
  result: any;
  companysoc: any;
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private service: UserGlobalService) {
    this.companyName = localStorage.getItem('namecompany') ;
  }
  colsusercompany = [
    { field: 'userId', header: 'Id', display: 'none' },
      { field: 'companyId', header: 'iid',display: 'none'},
      { field: 'companyName', header: 'Comapany', width: '100%', display: 'table-cell',  align: 'left', size: '0.8em' },
      { field: 'enableCompany', header: 'Enable', width: '20%', display: 'none',  align: 'center', size: '0.8em' },
      { field: 'bydefault', header: 'Default', width: '20%', display: 'none',  align: 'center', size: '0.8em' }
  ];
  colsusercompanyexercice = [
     { field: 'exerciceCompanyId',  header: 'Id', display: 'none' },
      { field: 'exerciceYear', header: 'Exercice', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' },

  ];
  colsuserexercice = [
    { field: 'societeId', header: 'Id', display: 'none' },
    { field: 'annee', header: 'Annee', width: '10%', display: 'table-cell',  align: 'left', size: '0.8em'},
    { field: 'bydefaultuse', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
  ];
  getcompanyUser(){
    let res = new Array<any>(); res.push('id'); res.push(localStorage.getItem('useremail'));
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
  savedata(){

     this.getcompanyUser()
    this.display=true;
  }
  Getdealer() {
    let res = new Array<any>();
    this.Spinner.show();
     res.push('id'); res.push(this.wcompanyid);
     this.resultx = []; this.resultx = res;
    this.Spinner.show(); this.resultexercice=[];
      this.service.getList("/ExerciceSociete/GetAllExercice3", this.resultx)
    .subscribe(
      (data:any) => {
        this.result=data;
        if(this.result.length > 0){
           this.companysoc = this.result[0]["societeId"];
           this.getyear();
        }else{
          this.Spinner.hide();
        }

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
  getyear(){
    this.Spinner.show();
    let res = new Array<any>(); res.push('userid'); res.push(localStorage.getItem('useremail'));
    res.push('id'); res.push(this.companysoc);
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/UserExercice/GetAllUserExer", this.resultx)
    .subscribe(
      (data:any) => {
        this.resultexercice=data;
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
  selectrowchoose2(e) {
    this.wcompany = e.data.companyName;
    this.wcompanyid= e.data.companyId;
    this.Getdealer();
  }
  selectrowexercice(e) {
    this.Spinner.show();
    this.fiilenew.CompanyName = this.wcompany;  this.fiilenew.CompanyId = this.wcompanyid;
    this.fiilenew.Bydefault =1; this.fiilenew.EnableCompany =1;
    this.fiilenew.UserId =  localStorage.getItem('useremail');
     localStorage.setItem('namecompany', this.fiilenew.CompanyName);
     localStorage.setItem('companycode', this.fiilenew.CompanyId.toString());
     this.loading = true;
     let i = 0;
  localStorage.setItem('exercicecompany',e.data.annee);
   this.service.ExecutePost("/UserCompany/Updatenew", this.fiilenew).subscribe(() => {
     if (i === 0) {
       i = 1;
       this.Spinner.hide();
    this.display=false;
    this.loading = false;
    window.location.reload();

     } else {
       this.loading = false;
     }

   }, err =>  console.error(err));
  }
  selectrowchoose(e) {
  if(e.data.exerciceYear !== 0)
  {
      this.loading = true;
        let i = 0;
     localStorage.setItem('exercicecompany',e.data.exerciceYear);
      this.service.ExecutePost("/UserCompany/Updatenew", this.fiilenew).subscribe(() => {
        if (i === 0) {
          i = 1;
        //  this.updateyear();
     //  this.getcompanyUser();
       this.display=false;
       this.loading = false;
       window.location.reload();

        } else {
          this.loading = false;
        }

      }, err =>  console.error(err))
    }
    else{
      this.snackbar.open('Inactive Company! Ask your Administration','?', {
        duration:4000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
    }

   }
   updateyear(){
    this.loading = true; let fiile = new exercicecompany(); let i = 0;
    fiile.ExerciceYear = parseInt(localStorage.getItem('exercicecompany'));
    fiile.ExerciceCompanyId = parseInt(localStorage.getItem('companycode'));
    fiile.ExerciceDefault = 1; fiile.ExerciceClose = 0;

    this.service.ExecutePost("/UserCompany/UpdateExercice", fiile).subscribe(() => {
    if (i === 0) {
      this.loading = false;
      this.display = false;
    } else {
    }

  }, err => console.error(err));
   }
  ngOnInit() {
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {

      this.companyName = localStorage.getItem('namecompany') ;
      this.exercicecompany = localStorage.getItem('exercicecompany') ;
       this.shower=LogoutpartialviewComponent;

    }else{
       this.shower=LoginandsignuppartialviewComponent;
    }
  }


}
interface Email {
  userFullName: string,
  email:string

}

