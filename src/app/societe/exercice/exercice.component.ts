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
import { SocieteG } from 'src/app/Models/societe/SocieteG';
import { exercice } from 'src/app/Models/societe/exercice';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent implements OnInit {

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
  loading: boolean;
  result: any; resultx: string[] = [];
  url: string;resultSettingap:string[]=[];selectedEmail: Email;
    username: any;companyId:number=0;
  standarCompany: string;wcompany: string;
  resultsoc: any;expression:boolean=false;
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.setMenu(); this.createForm();
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
    this.angForm.setValue({ annee: e.data.annee, checked: e.data.bydefaultuse });
  this.companyId = e.data.societeId;

}
  selectrow(e) {

    this.wcompany = e.data.raisonsocial;
    this.companyId = e.data.societeId;
    this.Getdealer();
  }
  onChange(e){
    console.log(this.expression);
  }

  onSubmit() {
    this.loading = true; let fiile = new exercice(); let i = 0;
      fiile.annee = this.angForm.value.annee;
      fiile.societeId = this.companyId;
      if(this.angForm.value.checked == false){
        fiile.bydefaultuse =0;
        }else{
          fiile.bydefaultuse =1;
        }

    this.service.ExecutePost("/ExerciceSociete/Update", fiile).subscribe(() => {
      if (i === 0) {
        i = 1;
      this.angForm.reset(); this.codeid = 0; this.Getdealer();
        this.loading = false;
        this.toastr.success('Updated Data ', 'Update');
      } else {

      }

    }, err => console.error(err));
  }
  onDelete(){

  }
  Getdealer() {
    let res = new Array<any>();
    this.Spinner.show();
     res.push('id'); res.push(this.companyId);
     this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/ExerciceSociete/GetAllExercice2", this.resultx)
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
  Getsocieteg() {
    let res = new Array<any>();
    this.Spinner.show();
    this.standarCompany = localStorage.getItem('CompanyGlobalId');
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

    ngOnInit() {
      if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
      {
         this.shower=LogoutpartialviewComponent;
      }else{
         this.shower=LoginandsignuppartialviewComponent;
      }
      Promise.resolve('done')
        .then((val) => { this.Getsocieteg();})
        .then((val) => {this.setMenu() })
        .catch((err) => console.error(err));

  }

}
interface Email {
  userFullName: string,
  email:string

}

