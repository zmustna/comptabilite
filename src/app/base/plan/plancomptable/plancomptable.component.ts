import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
import { LoginandsignuppartialviewComponent } from 'src/app/User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from 'src/app/User/logoutpartialview/logoutpartialview.component';
import { CompteComptablex } from 'src/app/Models/base/compteComptablex';
import { Typejournal } from 'src/app/Models/base/Typejournal';
import { compte } from 'src/app/Models/base/Compte';

@Component({
  selector: 'app-plancomptable',
  templateUrl: './plancomptable.component.html',
  styleUrls: ['./plancomptable.component.scss']
})
export class PlancomptableComponent implements OnInit {
  cols = [
    { field: 'companyId', header: 'Id', display: 'none' },
     { field: 'compteId', header: 'Compte', width: '9%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
     { field: 'libelle', header: 'Libelle', width: '27%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
     { field: 'type_compte', header: 'T.Compte', width: '8%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
     { field: 'libelletype', header: 'Type libelle', width: '19%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
     { field: 'compte_bilan', header: 'C.Bilan', width: '8%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
     { field: 'libellebilan', header: 'Libelle C.Bilan', width: '28%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
  ];

  cols0 = [
    { field: 'type_code', header: 'Compte', width: '20%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
   { field: 'libelle', header: 'Libelle', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},

 ];
 cols01 = [
  { field: 'comptebilanid', header: 'Compte Bilan', width: '20%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
 { field: 'libelle', header: 'Libelle', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},

];
    shower:any;

  @ViewChild('namex1') nameElement: ElementRef;
  @ViewChild('file') myInputVariable: ElementRef;
  selectedCar1: compte;displaycompte:boolean=false;selectedCar2:CompteComptablex;selectedCar3:Typejournal;
  codeid: string = "";codeCompany:number=0;ifresult:number=0;
    angForm: FormGroup; userDetails; myFile: any;
  loading: boolean; message: string;
  result: any[]=[]; resultx: string[] = [];resultper:any[]=[];resultperj:any[]=[];
  url: string;
    username: any;comptec:string="";namec:string="";comptej:string;namej:string="";
  standarCompany: any;
  resulttele: any;
  progress: number; displayroute = false;displayjournal = false;
  constructor(private http: HttpClient, private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
        name: ['', Validators.required],
        code: ['', Validators.required],
    });
  }
  chosirjournal(){
    this.displayjournal=true;
  }
  choisircompte(){
    this.displayroute=true;
  }
  ngAfterViewInit() {
    this.nameElement.nativeElement.focus();
  }
  deleteid() {

  }
  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }
  createAndDownloadBlobFile(body, filename, extension = 'pdf') {
    const blob = new Blob([body]);
    const fileName = `${filename}.${extension}`;

      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

  }
  imprimer() {

    this.Spinner.show();
      this.service.getResult("/comptecomptable/CreatePDF")
    .subscribe(
      (data:any) => {
        const arrayBuffer = this.base64ToArrayBuffer(data);
        this.createAndDownloadBlobFile(arrayBuffer, 'PlanComptable');
        this.Spinner.hide();
      },
      (err:any)=>{
        console.log(err)
        this.Spinner.hide();

      }
    )
  }
  hideDialog(){
this.displaycompte=false;
  }
  savegrand(){

  }
  onChange(event) {
    let files = event.srcElement.files;
    let yFile = event.target.files[0];
   this.myFile = yFile.name;

  }
  upload(files, e) {
    this.loading = true;
    if (files.length === 0)
      return;

    this.onChange(e);
    const formData = new FormData();
    formData.append('CompanyId', this.codeCompany.toString());
    formData.append('useremail', localStorage.getItem('useremail'));

    for (let file of files)
      formData.append(file.name, file);
      formData.forEach((value, key) => {
        console.log("key %s: value %s", key, value);
        })
           const uploadReq = new HttpRequest('POST',this.service.BaseURI + `/CompteComptable/UploadFile3`, formData, {
              reportProgress: true,
            });

    this.http.request(uploadReq).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.myInputVariable.nativeElement.value = "";
        this.message = event.body.toString();
        this.resulttele = event.body;
        this.ifresult = 1; this.loading = false;this.hideDialog();this.getstate();

      }
    });

  }
  UploadFile(){
this.displaycompte = true;
  }
  onRowSelect(event) {

  }

  onRowUnselect(event) {

  }
  selectrow(e) {
    if ( e.data.companyId === 0){
      this.snackbar.open('You are not Authorized !','X', {
        duration:4000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
    }else{
      this.angForm.setValue({ name: e.data.libelle, code: e.data.compteId});
      this.codeid = e.data.compteId;
      this.comptec= e.data.type_compte; this.namec= e.data.libelletype;
      this.comptej= e.data.compte_bilan; this.namej= e.data.libellebilan;
      this.nameElement.nativeElement.focus();
    }

  }
  selectrowjournal(e) {
    this.comptej= e.data.comptebilanid; this.namej= e.data.libelle;
}
selectrowcompte(e) {
  this.comptec= e.data.type_code; this.namec= e.data.libelle;
}
  onDelete(){
    let res = new Array<any>();
   res.push('id'); res.push(this.codeid);
    this.resultx = []; this.resultx = res;
    console.log(this.resultx);
   this.Spinner.show();
     this.service.getList("/comptecomptable/GetDelcompte", this.resultx)
   .subscribe(
     (data:any) => {
      this.comptej=""; this.comptec="";this.namec="";
      this.namej="";
      this.angForm.reset(); this.codeid = ""; this.getstate();

       this.Spinner.hide();
     },
     (err:any)=>{
       this.Spinner.hide();

     }
   )
  }
  onSubmit() {
      this.loading = true; let fiile = new compte(); let i = 0;
      fiile.libelle = this.angForm.value.name;
       fiile.compteId = this.angForm.value.code;
       let wcompte:number=fiile.compteId.length;
       if(wcompte < 10){
         for (let index = wcompte; index < 10; index++)
          {
            fiile.compteId = fiile.compteId + "0";
          }
       }
       fiile.type_compte = parseInt(this.comptec);
       fiile.companyId =  this.codeCompany;
       fiile.compte_bilan=this.comptej;
       fiile.CREDIT=0;fiile.DEBIT=0;fiile.compte_analytique='';fiile.compte_bugetaire='';fiile.mois=0;
       fiile.montant_budget=0;fiile.pays=0;fiile.ville=0;
      this.service.ExecutePost("/comptecomptable/Update", fiile).subscribe(() => {
      if (i === 0) {
        this.comptej=""; this.comptec="";this.namec="";
        this.namej="";
        this.angForm.reset(); this.codeid = ""; this.getstate();
        this.loading = false;

      } else {
      }

    }, err => console.error(err));
  }


  getstate(){
    this.Spinner.show();
    let res = new Array<any>();
    res.push('id'); res.push(localStorage.getItem('companycode'));
     this.resultx = []; this.resultx = res;

    this.Spinner.show();
      this.service.getList("/comptecomptable/GetAllcompte", this.resultx)
        .subscribe(
      (data:any) => {
        this.result = [];
        this.result=data;
       // console.log(JSON.stringify(this.result));
        if(this.result.length > 0){ this.ifresult =0;}else{this.ifresult=1;}
        this.Spinner.hide();
      },
      (err:any)=>{
        this.Spinner.hide();
        this.snackbar.open('You are not Authorized Person to see Plan!','?', {
          duration:4000,
          horizontalPosition:'center',
          verticalPosition:'top'
        })
      }
    )
  }
  getcompte(){
    this.Spinner.show();
      this.service.getResult("/Typecompte/GetAlltypecompte")
    .subscribe(
      (data:any) => {
        this.resultper = [];
        this.resultper=data;

        this.Spinner.hide();
      },
      (err:any)=>{
        this.Spinner.hide();
        this.snackbar.open('You are not Authorized Person to see Plan!','?', {
          duration:4000,
          horizontalPosition:'center',
          verticalPosition:'top'
        })
      }
    )
  }
  getjournal(){
    this.Spinner.show();
      this.service.getResult("/CompteB/GetAllcomptebilan")
    .subscribe(
      (data:any) => {
        this.resultperj = [];
        this.resultperj=data;

        this.Spinner.hide();
      },
      (err:any)=>{
        this.Spinner.hide();
        this.snackbar.open('You are not Authorized Person to see Plan!','?', {
          duration:4000,
          horizontalPosition:'center',
          verticalPosition:'top'
        })
      }
    )
  }
  setMenu(){
    localStorage.setItem('sousmenu','2');
  }
    ngOnInit() {
      this.standarCompany = localStorage.getItem('CompanyGlobalId');
      this.codeCompany = parseInt( localStorage.getItem('companycode'));
      if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
      {
         this.shower=LogoutpartialviewComponent;
      }else{
         this.shower=LoginandsignuppartialviewComponent;
      }
      Promise.resolve('done')
        .then((val) => {this.setMenu()})
        .then((val) => { this.getstate()})
        .then((val) => { this.getcompte()})
        .then((val) => { this.getjournal()})
        .catch((err) => console.error(err));

  }

}

