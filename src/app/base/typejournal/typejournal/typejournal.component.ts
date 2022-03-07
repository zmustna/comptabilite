import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
import { typecomptem } from 'src/app/Models/base/typecomptem';
import { companyUser } from 'src/app/Models/companyUser';
import { LoginandsignuppartialviewComponent } from 'src/app/User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from 'src/app/User/logoutpartialview/logoutpartialview.component';

@Component({
  selector: 'app-typejournal',
  templateUrl: './typejournal.component.html',
  styleUrls: ['./typejournal.component.scss']
})
export class TypejournalComponent implements OnInit {
  cols = [
     { field: 'type_code', header: 'Id', display: 'none' },
    { field: 'libelle', header: 'Libelle', width: '80%', display: 'table-cell',  align: 'left', size: '0.8em',background: 'black',color: 'white'},

  ];

  shower:any;

  @ViewChild('namex') nameElement: ElementRef;
  @ViewChild('file') myInputVariable: ElementRef;
  selectedCar1: companyUser;displaycompte:boolean=false;
  codeid: number = 0;codeCompany:number=0;ifresult:number=0;
    angForm: FormGroup; userDetails; myFile: any;
  loading: boolean; message: string;
  result: any[]=[]; resultx: string[] = [];
  url: string;
    username: any;
  standarCompany: any;
  resulttele: any;
  progress: number;
  constructor(private http: HttpClient, private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
        name: ['', Validators.required],

    });
  }

  ngAfterViewInit() {
    this.nameElement.nativeElement.focus();
  }
  deleteid() {

  }
  imprimer() {
    this.Spinner.show();
      this.service.getResult("/typejournal/CreatePDF")
    .subscribe(
      (data:any) => {

        this.Spinner.hide();
      },
      (err:any)=>{
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
      this.angForm.setValue({ name: e.data.libelle });
    this.codeid = e.data.type_code;
    this.nameElement.nativeElement.focus();
  }
  onDelete(){
    let res = new Array<any>();
   res.push('id'); res.push(this.codeid);
    this.resultx = []; this.resultx = res;
   this.Spinner.show();
     this.service.getList("/Typejournal/GetDeltypejournal", this.resultx)
   .subscribe(
     (data:any) => {
      this.codeid = 0;this.angForm.reset(); this.getstate();
       this.Spinner.hide();
     },
     (err:any)=>{
       this.Spinner.hide();

     }
   )
  }
  onSubmit() {
    this.loading = true; let fiile = new typecomptem(); let i = 0;
      fiile.libelle = this.angForm.value.name;
       fiile.type_code = this.codeid;

      this.service.ExecutePost("/Typejournal/Update", fiile).subscribe(() => {
      if (i === 0) {
        this.angForm.reset(); this.codeid = 0; this.getstate();
        this.loading = false;

      } else {
      }

    }, err => console.error(err));
  }


  getstate(){
    this.Spinner.show();
      this.service.getResult("/Typejournal/GetAlltypejournal")
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
        .catch((err) => console.error(err));

  }

}
