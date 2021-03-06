import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SelectItem } from "primeng/api";
import { Table } from "primeng/table";
import { UserGlobalService } from "src/app/AppServices/ServiceGlobal/UserGlobalService";
import { mvtdetail } from "src/app/Models/base/mvtdetail";
import { companyUser } from "src/app/Models/companyUser";
import { LoginandsignuppartialviewComponent } from "src/app/User/loginandsignuppartialview/loginandsignuppartialview.component";
import { LogoutpartialviewComponent } from "src/app/User/logoutpartialview/logoutpartialview.component";
import { CompteComptablex } from "../../Models/base/compteComptablex";
import { journal } from '../../Models/base/journal';
import * as moment from 'moment';

interface Journ {
  jl_design: string,
  jL_code: number
}
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
datedu:Date;dateau:Date;compte:string="";
  title: string = "Saisie Des Eritures Comptables Exercice";
  customIcon="fa fa-search"; day: number=0;

  resultt: any[];
  resulto: any[];
  displayfolio: boolean;
  wjournau: any;
  wjourndu: any;

  colsfolio = [
    { field: "mv_mmc", header: "Mois",  width: "10%", display: "table-cell",  align: "center", size: "0.8em" },
    { field: "jl_code", header: "jlcode",  display: "none",  align: "left", size: "0.8em" },
    { field: "client", header: "Journal",  width: "80%", display: "table-cell",  align: "left", size: "0.8em" },
    { field: "mv_folio", header: "Folio",  width: "10%", display: "table-cell",  align: "right", size: "0.8em"  },

  ];
  cols = [
    { field: "mv_compt", header: "Compte",  width: "10%", display: "table-cell",  align: "center", size: "0.8em" },
    { field: "mv_libop", header: "Intitule Du Compte",  width: "40%", display: "table-cell",  align: "left", size: "0.8em" },
    { field: "mv_solde", header: "Solde A Nouveau",  width: "10%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_montd", header: "Cumul Debit",  width: "10%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_montc", header: "Cumul Credit",  width: "10%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_montdd", header: "Solde Periodique",  width: "10%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_montcc", header: "Solde Total",  width: "10%", display: "table-cell",  align: "right", size: "0.8em" },

  ];

  colsusercompany = [
    { field: 'compteId', header: 'Compte',  width: '30%', display: 'table-cell',  align: 'left', size: '0.8em' },
    { field: 'libelle', header: 'Libelle', width: '70%', display: 'table-cell',  align: 'left', size: '0.8em'},
  ];

  selectedCompte:CompteComptablex;
  @ViewChild("wpieceelem") wpieceelement: ElementRef;
  @ViewChild("wfolio") wfolioelement: ElementRef;
  @ViewChild("wjourelem") wjourelemlement: ElementRef;
  @ViewChild("wlibelle") wlibellelement: ElementRef;
  @ViewChild("wdebitt") wdebitelement: ElementRef;
  @ViewChild("wcredit") wcreditelement: ElementRef;
  @ViewChild("wcomptee") wcompteelement: ElementRef;
  @ViewChild("wlibellee") wlibelleelement: ElementRef;
  @ViewChild("btnsumb") wbtnsumbelement: ElementRef;

  cities: any[]; selectedCity1: journal; selectedCity2: Journ;items: SelectItem[]; shower:any; selecteditem: mvtdetail;
  @ViewChild("namex") nameElement: ElementRef; @ViewChild("file") myInputVariable: ElementRef;
  selectedCar1: companyUser;displaycompte:boolean=false; codeid: number = 0;codeCompany:number=0;ifresult:number=0;
    angForm: FormGroup; userDetails; myFile: any;loading: boolean; message: string; result: any[]=[]; resultx: string[] = [];
  url: string; username: any;standarCompany: any;resulttele: any; progress: number;resultJOURNAL:any[]=[];resultCompany:any[]=[];
  wjour:number;wpiece:number=0;wcompte:string="";wlibelle:string="";wdebit:number;wcredit:number;wmvtmvt:number;
display:boolean=false;moiss:number=0;journn:number=0;wmois:number=0;
@ViewChild("dt33") public table: Table;wligne:number=0;wjourn:number=0;witchcompte:number=0;
filterFromUrl:string="";comptelibelle:string="";displayediter:boolean=false;comptedu:string="";compteau:string="";

  constructor(private http: HttpClient, private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private fb: FormBuilder,  private router: Router, private service: UserGlobalService, private toastr: ToastrService) {
    this.setMenu(); this.createForm();this.createmonth();
  }
  onKeyDownEvent(event: any){
    if (event.target.value > this.day){
      this.wjourelemlement.nativeElement.value = ' ';
      this.wjourelemlement.nativeElement.focus();

     }else{
      this.wpieceelement.nativeElement.focus();
     }

    //console.log(event.target.value);

 }
 changeColor(rowData){
   return rowData.mv_compt.length < 3 ?'red' : 'black';

 }
 onChangeEvent(e){
   if (e.target.value > this.day){
    this.wjourelemlement.nativeElement.value = ' ';
    this.wjourelemlement.nativeElement.focus();

   }
  // alert(e.target.value);
 }
 compteEvent(event: any){
  this.wcompteelement.nativeElement.focus();
  }
  sumb(e){
    this.wbtnsumbelement.nativeElement.focus();
  }
  valuechange(e){
    if (e > 0){
      this.wdebitelement.nativeElement.value = ' ';

     }else{

     }

  }
  valuechangedeb(e){
    if (e > 0){
      this.wcreditelement.nativeElement.value = ' ';

     }else{

     }

  }
  debitEvent(event: any){
    this.wdebitelement.nativeElement.focus();
    }
    creditEvent(event: any){
      this.wcreditelement.nativeElement.focus();
      }
  libelleEvent(event: any){

    this.filterFromUrl = this.compte;
    let wcompte=this.filterFromUrl.length;
       if(wcompte < 10){
         for (let index = wcompte; index < 10; index++)
          {
            this.filterFromUrl = this.filterFromUrl + "0";
          }
       }

  let filtered = roleParam => this.resultCompany.some( ({compteId}) => compteId == roleParam)
let gg = this.resultCompany.filter( ({compteId}) => compteId == this.filterFromUrl);

if (filtered(this.filterFromUrl)){

  this.comptelibelle = gg[0]["libelle"];
  this.compte = gg[0]["compteId"];

  this.display = false;
}else{
  this.display = true;

}

    }
 createmonth(){
  this.cities = [
    {name: 'Janvier', code: 1},
    {name: 'F??vrier', code: 2},
    {name: 'Mars', code: 3},
    {name: 'Avril', code: 4},
    {name: 'Mai', code: 5},
    {name: 'Juin', code: 6},
    {name: 'Juillet', code: 7},
    {name: 'Ao??t', code: 8},
    {name: 'Septembre', code: 9},
    {name: 'Octobre', code: 10},
    {name: 'Novembre', code: 11},
    {name: 'D??cembre', code: 12}
];
let res = new Array<any>(); res.push("CompanyId"); res.push(localStorage.getItem("companycode"));
this.resultx = []; this.resultx = res;
this.Spinner.show();

 }
  createForm() {
    this.angForm = this.fb.group({
        jour: ["", Validators.required],
        piece: ["", Validators.required],
        compte: ["", Validators.required],
        libelle: ["", Validators.required],
        debit: ["", Validators.required],
        credit: ["", Validators.required],
    });
  }

  ngAfterViewInit() {
   // this.nameElement.nativeElement.focus();
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
  imprimerg() {
    this.displayediter=true;
  }
  imprimer() {
    this.Spinner.show();
    let res = new Array<any>();
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('datedu'); res.push(moment(this.datedu).format("MM/DD/YYYY"));
    res.push('dateau'); res.push(moment(this.dateau ).format("MM/DD/YYYY"));
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));

       this.resultx = []; this.resultx = res;
      this.service.getList("/fmvt/CreatePDFbalance", this.resultx)
    .subscribe(
      (data:any) => {
        const arrayBuffer = this.base64ToArrayBuffer(data);
        this.createAndDownloadBlobFile(arrayBuffer, 'Balance');
        this.Spinner.hide();
      },
      (err:any)=>{
        console.log(err)
        this.Spinner.hide();

      }
    )
  }
  imprimero() {
    this.Spinner.show();
    let res = new Array<any>();
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
       this.resultx = []; this.resultx = res;
      this.service.getList("/fmvt/Getfmvt", this.resultx)
    .subscribe(
      (data:any) => {
        this.result = [];
        this.result=data;
        console.log(JSON.stringify(data));

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

  UploadFile(){
this.displaycompte = true;
  }
  onRowSelect(event) {

  }

  onRowUnselect(event) {

  }
  onChangemois(event) {
    this.moiss =  parseInt(event);
    let year = parseInt( localStorage.getItem("exercicecompany"));
    let month = this.moiss;
    this.day = new Date(year, month, 0).getDate();
    if(this.journn > 0) this.getmvtdetail();
}
onChangejour(event) {
 this.journn= event;

if(this.moiss > 0) this.getmvtdetail();
}
onChangejourg(event, a) {
  alert(event + "  " + a);
  if(a === 2) this.wjournau= event; if(a === 1) this.wjourndu= event;
  }

onReset(){
  this.wmois = 0; this.moiss=0; this.wjour = 0; this.journn=0;this.wjourn=0; this.result = []; this.angForm.reset(); this.wligne = 0;this.wfolioelement.nativeElement.value = ' ';
}
  getmvtdetail(){
    let res = new Array<any>();
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('mois');  res.push(this.moiss);
    res.push('journ');  res.push(this.journn);
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
    this.resultx = []; this.resultx = res;
    this.Spinner.show(); this.result = [];
      this.service.getList("/fmvt/GetAllfolio", this.resultx)
    .subscribe(
      (data:any) => {
        this.resultt = [];
        this.resultt=data;
        if (this.resultt.length > 0)
        {
          this.wmvtmvt = this.resultt[0]['mv_folio'] + 1;
         // this.getmvtdetailfolio();

        }else{
          this.wmvtmvt = 1;
        }
        this.wjourelemlement.nativeElement.focus();
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
  getmvtdetailfilio(){
    let res = new Array<any>();
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('mois');  res.push(this.moiss);
    res.push('journ');  res.push(this.journn);
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/fmvt/Getcompteid", this.resultx)
    .subscribe(
      (data:any) => {
        this.resulto = [];
        this.resulto=data;
       this.displayfolio = true;
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
  getmvtdetailfolio(){
    let res = new Array<any>();
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('mois');  res.push(this.moiss);
    res.push('journ');  res.push(this.journn);
    res.push('id');  res.push(this.wmvtmvt);
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
    this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/fmvt/GetAllfoliodet", this.resultx)
    .subscribe(
      (data:any) => {
        this.result = [];
        this.result=data;

        this.wjourelemlement.nativeElement.focus();
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
  onCompteChange(e){
        this.display=true;
  }
  onFocusEvent(e){
    this.display=true;
  }
  onducompte(x){
     this.witchcompte = x;
  }
  selectrowchoosefolio(e){
    this.wmvtmvt = e.data.mv_folio;
    this.journn = e.data.jl_code;
    this.wjourn = e.data.jl_code;
  this.moiss = e.data.mv_mmc;
  this.wmois = e.data.mv_mmc;
  console.log(this.wmois);
    this.getmvtdetailfolio();
    this.displayfolio = false;
     }
  selectrowchoose2(e){
    this.compte= e.data.compteId,
    this.comptelibelle= e.data.libelle;
    this.display = false;
  }
  selectrowchoose3(e){
    if (this.witchcompte === 1){
      this.comptedu= e.data.compteId
     // this.comptelibelle= e.data.libelle;
    }
    if (this.witchcompte === 2){
      this.compteau= e.data.compteId
     // this.comptelibelle= e.data.libelle;
    }

  }
  selectrow(e) {
    this.wjour = e.data.mvtJour; this.wpiece = e.data.mvtPiece;this.wcompte = e.data.compteId;
    this.wlibelle = e.data.mvtLibelle; this.wdebit = e.data.mvtDebit;this.wcredit = e.data.mvtCredit;
    this.codeid=e.data.mvtId;
    this.nameElement.nativeElement.focus();
  }
  onSubmit() {
    this.Spinner.show();
    let res = new Array<any>();
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('datedu'); res.push(moment(this.datedu).format("MM/DD/YYYY"));
    res.push('dateau'); res.push(moment(this.dateau ).format("MM/DD/YYYY"));
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
    this.resultx = []; this.resultx = res;
    this.service.getList("/fmvt/GetBalance", this.resultx)
    .subscribe(
      (data:any) => {
        this.result = [];
        this.result=data;

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

  getcomptecomptable(){
    this.Spinner.show();
    let res = new Array<any>();
    res.push('id'); res.push(localStorage.getItem('companycode'));
     this.resultx = []; this.resultx = res;
    this.service.getList("/comptecomptable/GetAllcompte", this.resultx)
    .subscribe(
      (data:any) => {
        this.resultCompany = [];
        this.resultCompany=data;
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
    let res = new Array<any>();
    res.push('id'); res.push(localStorage.getItem('companycode'));
     this.resultx = []; this.resultx = res;
    this.service.getList("/journal/GetAlljournal", this.resultx)
  .subscribe(
    (data:any) => {
      this.resultJOURNAL = [];
      this.resultJOURNAL=data;
    //  console.log(JSON.stringify(data));
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
    localStorage.setItem("sousmenu","4");
  }
    ngOnInit() {
      this.standarCompany = localStorage.getItem("CompanyGlobalId");
      this.codeCompany = parseInt( localStorage.getItem("companycode"));
      if(localStorage.getItem("userToken") != null && localStorage.getItem("userToken") != "null")
      {
         this.shower=LogoutpartialviewComponent;
      }else{
         this.shower=LoginandsignuppartialviewComponent;
      }
      Promise.resolve("done")
        .then((val) => {this.setMenu()})
        .then((val) => { this.getjournal()})
        .catch((err) => console.error(err));

  }

}
