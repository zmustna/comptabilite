import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
import { radical } from 'src/app/Models/base/radical';
import {journal} from 'src/app/Models/base/journal';
import { companyUser } from 'src/app/Models/companyUser';
import { LoginandsignuppartialviewComponent } from 'src/app/User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from 'src/app/User/logoutpartialview/logoutpartialview.component';
import { CompteComptablex } from 'src/app/Models/base/compteComptablex';
import { Typejournal } from 'src/app/Models/base/Typejournal';
@Component({
  selector: 'app-journalbase',
  templateUrl: './journalbase.component.html',
  styleUrls: ['./journalbase.component.scss']
})
export class JournalbaseComponent implements OnInit {
  cols = [
     { field: 'jL_code', header: 'Id', display: 'none' },
     { field: 'companyId', header: 'Id', display: 'none' },
     { field: 'type_journal', header: 'Idj', display: 'none' },
    { field: 'jl_design', header: 'Libelle', width: '30%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
    { field: 'abreg', header: 'Abreg', width: '10%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
    { field: 'compte', header: 'Compte', width: '10%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
    { field: 'comptelibelle', header: 'Compte libelle', width: '30%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
    { field: 'libelle', header: 'Journal libelle', width: '20%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
  ];
  cols0 = [
    { field: 'compteId', header: 'Compte', width: '20%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
   { field: 'libelle', header: 'Libelle', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},

 ];
 cols01 = [
  { field: 'type_code', header: 'Type Journal', width: '20%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},
 { field: 'libelle', header: 'Libelle', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},

];
    shower:any;

  @ViewChild('namex') nameElement: ElementRef;
  @ViewChild('file') myInputVariable: ElementRef;
  selectedCar1: journal;displaycompte:boolean=false;selectedCar2:CompteComptablex;selectedCar3:Typejournal;
  codeid: number = 0;codeCompany:number=0;ifresult:number=0;
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
        compte: ['', Validators.required],
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
  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }
  imprimer() {


      /*
      let res = new Array<any>(); res.push('useremail'); res.push(localStorage.getItem('useremail'));
      res.push('CompanyId'); res.push(this.codeCompany.toString());
      res.push('companyname');res.push(localStorage.getItem('namecompany'));
       this.resultx = []; this.resultx = res;
       */
      this.Spinner.show();
        this.service.getResult("/journal/CreatePDF")
      .subscribe(
        (data:any) => {
          const arrayBuffer = this.base64ToArrayBuffer(data);
          this.createAndDownloadBlobFile(arrayBuffer, 'jorn');
         //// let file = new Blob([data.byteArray], { type: 'application/pdf' });
        //  var fileURL = URL.createObjectURL(file);
        //  window.open(fileURL);
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
    this.angForm.setValue({ name: e.data.jl_design, compte: e.data.abreg});
    this.codeid = e.data.jL_code;
    this.comptec= e.data.compte; this.namec= e.data.comptelibelle;
    this.comptej= e.data.type_journal; this.namej= e.data.libelle;
    this.nameElement.nativeElement.focus();
  }
  selectrowjournal(e) {
    this.comptej= e.data.type_code; this.namej= e.data.libelle;
    this.displayjournal = false;
}
selectrowcompte(e) {
  this.comptec= e.data.compteId; this.namec= e.data.libelle;
  this.displayroute = false;
}
  onDelete(){
    let res = new Array<any>();
   res.push('id'); res.push(this.codeid);
   res.push('companyId'); res.push(this.codeCompany);

   this.resultx = []; this.resultx = res;
   this.Spinner.show();
     this.service.getList("/journal/GetDeljournal", this.resultx)
   .subscribe(
     (data:any) => {
      this.comptej=""; this.comptec="";this.namec="";
      this.namej="";
      this.angForm.reset(); this.codeid = 0; this.getstate();

       this.Spinner.hide();
     },
     (err:any)=>{
       this.Spinner.hide();

     }
   )
  }
  onSubmit() {
    this.loading = true; let fiile = new journal(); let i = 0;
      fiile.jl_design = this.angForm.value.name;
      fiile.abreg = this.angForm.value.compte.toUpperCase();
      fiile.companyId = this.codeCompany;
       fiile.JL_code = this.codeid;
       fiile.compte = this.comptec;
       fiile.type_journal=parseInt(this.comptej);
      this.service.ExecutePost("/journal/Update", fiile).subscribe(() => {
      if (i === 0) {
        this.comptej=""; this.comptec="";this.namec="";
        this.namej="";
        this.angForm.reset(); this.codeid = 0; this.getstate();
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
    this.service.getList("/journal/GetAlljournal", this.resultx)
       .subscribe(
      (data:any) => {
        this.result = [];
        this.result=data;
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
    let res = new Array<any>();
    res.push('id'); res.push(localStorage.getItem('companycode'));
     this.resultx = []; this.resultx = res;
    this.service.getList("/comptecomptable/GetAllcompte", this.resultx)
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
      this.service.getResult("/typejournal/GetAlltypejournal")
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
