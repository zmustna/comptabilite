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

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss']
})
export class SocieteComponent implements OnInit {
  cols = [
    { field: 'companyId', header: 'Id', display: 'none' },
    { field: 'companyGlobalId', header: 'Id', display: 'none' },
    { field: 'companyName', header: 'Company Name', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em'},
    { field: 'companyActive', header: 'Enable', width: '20%', display: 'table-cell',  align: 'center', size: '0.8em' }
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
    { field: 'cnss', header: 'CNSS', width: '10%', display: 'table-cell',  align: 'center', size: '0.8em' },
    { field: 'ice', header: 'I.C.E', width: '10%', display: 'table-cell',  align: 'center', size: '0.8em' }

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
  standarCompany: string;
  resultsoc: any;expression:boolean=false;
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.setMenu(); this.createForm();
  }
  setMenu(){
    localStorage.setItem('sousmenu','11');
  }
  createForm() {
    this.angForm = this.fb.group({
      raisonsocial: ['', Validators.required],
      fjuridique: ['', Validators.required],
      abr: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      tel: ['', Validators.required],
      fax: ['', Validators.required],
      regime: ['', Validators.required],
      model: ['', Validators.required],
      rc: ['', Validators.required],
      patente: ['', Validators.required],
      cnss: ['', Validators.required],
      iff: ['', Validators.required],
      ice: ['', Validators.required],
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
    let wwdeb:string = ""; let wwmodel:string="";
    let filtered = roleParam => this.resultsoc.some( ({companyId}) => companyId == roleParam)
    let gg = this.resultsoc.filter( ({companyId}) => companyId == e.data.companyId);

    if (filtered( e.data.companyId))
    {
      if ( parseInt(gg[0]["tvadebit"]) == 1){
          wwdeb = "Debit";
      }else{
        wwdeb = "Encaissement";
      }
      if ( parseInt(gg[0]["tvaigrs"]) == 1) wwmodel = "igrs";
      if ( parseInt(gg[0]["tvaigrn"]) == 1) wwmodel = "igrn";
      if ( parseInt(gg[0]["tvaisn"]) == 1) wwmodel = "isn";
      if ( parseInt(gg[0]["tvaiss"]) == 1) wwmodel = "iss";
      console.log(wwmodel);
      this.codeid =  gg[0]["societeId"];this.companyId = e.data.companyId;
      this.angForm.setValue(
        { raisonsocial:  gg[0]["raisonsocial"],fjuridique: gg[0]["formjuridique"],
         abr: gg[0]["abreviation"], adresse:  gg[0]["adresse"],
        ville:  gg[0]["ville"], pays:  gg[0]["pays"],tel:  gg[0]["tele"],fax:  gg[0]["fax"],
        regime:wwdeb, model:wwmodel, rc: gg[0]["rc"],patente: gg[0]["patente"],
        cnss: gg[0]["cnss"],iff: gg[0]["iff"],ice: gg[0]["ice"]
      });

    }else{
      this.angForm.reset(); this.codeid=0;this.companyId = e.data.companyId;
      this.angForm.setValue({ raisonsocial:   e.data.companyName,fjuridique:'', abr: '', adresse: '',
        ville:  '', pays:  '',tel: '',fax: '',regime: ''
        ,model: '',rc: '',patente: '',cnss: '',iff: '',ice: '' });

    }


    this.nameElement.nativeElement.focus();
  }
  onChange(e){
    console.log(this.expression);
  }

  onSubmit() {
    this.Spinner.show(); let fiile = new SocieteG(); let i = 0;
      fiile.abreviation = this.angForm.value.abr; fiile.adresse = this.angForm.value.adresse;
      fiile.cnss = this.angForm.value.cnss; fiile.fax = this.angForm.value.fax;
      fiile.raisonsocial= this.angForm.value.raisonsocial;
      fiile.formjuridique = this.angForm.value.fjuridique; fiile.iff = this.angForm.value.iff;
      fiile.patente = this.angForm.value.patente; fiile.pays = this.angForm.value.pays;
      fiile.rc = this.angForm.value.rc; fiile.tele = this.angForm.value.tel;
      fiile.ville = this.angForm.value.ville; fiile.companyId = this.companyId;
      fiile.ice = this.angForm.value.ice;
      fiile.societeId= this.codeid;
      switch(this.angForm.value.regime) {
        case "Debit": {
          fiile.tvadebit = 1;
          fiile.tvaEncai = 0;
           break;
        }
        case "Encaissement": {
          fiile.tvadebit = 0;
          fiile.tvaEncai = 1;
           break;
        }

     }
     switch(this.angForm.value.model) {
      case "igrs": {
        fiile.tvaigrs = 1;
        fiile.tvaigrn = 0;
        fiile.tvaisn = 0;
        fiile.tvaiss = 0;
         break;
      }
      case "igrn": {
        fiile.tvaigrs = 0;
        fiile.tvaigrn = 1;
        fiile.tvaisn = 0;
        fiile.tvaiss = 0;
         break;
      }
      case "iss": {
        fiile.tvaigrs = 0;
        fiile.tvaigrn = 0;
        fiile.tvaisn = 0;
        fiile.tvaiss = 1;
         break;
      }
      case "isn": {
        fiile.tvaigrs = 0;
        fiile.tvaigrn = 0;
        fiile.tvaisn = 1;
        fiile.tvaiss = 0;
         break;
      }
   }

    this.service.ExecutePost("/SocieteG/Update", fiile).subscribe(() => {
      if (i === 0) {
        i = 1;
      this.angForm.reset(); this.codeid = 0;this.companyId=0; this.Getsocieteg();
      this.Spinner.hide();
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
    this.standarCompany = localStorage.getItem('CompanyGlobalId');
    res.push('CompanyUserId'); res.push(this.standarCompany);
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
        .then((val) => { this.Getdealer();})
         .then((val) => {this.setMenu() })
        .catch((err) => console.error(err));

  }

}
interface Email {
  userFullName: string,
  email:string

}

