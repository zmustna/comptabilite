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
interface City {
  name: string,
  code: string
}
interface Journ {
  jl_design: string,
  jL_code: number
}
@Component({
  selector: 'app-recompte',
  templateUrl: './recompte.component.html',
  styleUrls: ['./recompte.component.css']
})
export class RecompteComponent implements OnInit {

datedu:Date;dateau:Date;compte:string="";compte2:string="";
  title: string = "Saisie Des Eritures Comptables Exercice";
  customIcon="fa fa-search"; day: number=0;
  exform: FormGroup = new FormGroup({
    'mois' : new FormControl(null, Validators.required),
    'journal' : new FormControl(null, Validators.required),
    'mouvement' : new FormControl(null, Validators.required),
    'compte' : new FormControl(null, Validators.required),
    'libelle' : new FormControl(null, Validators.required),
    'jour' : new FormControl(0, [Validators.min(1), Validators.max(this.day)]),
    'picec' : new FormControl(null, Validators.required),
    'NCompte' : new FormControl(null, Validators.required),
    'Libelle' : new FormControl(null, Validators.required),
    'LibelleC' : new FormControl(null, Validators.required),
    'debit' : new FormControl(null, Validators.required),
    'credit' : new FormControl(null, Validators.required)


  });
  resultt: any[];
  resulto: any[];
  displayfolio: boolean;

  clicksub(){
    console.log(this.exform.value);
    this.exform.reset();
  }
  get mois() { return this.exform.get('mois'); }
  get journal() { return this.exform.get('journal'); }
  get mouvement() { return this.exform.get('mouvement'); }

  get libelle() { return this.exform.get('libelle'); }
  get jour() { return this.exform.get('jour'); }
  get picec() { return this.exform.get('picec'); }
  get NCompte() { return this.exform.get('NCompte'); }
  get Libelle() { return this.exform.get('Libelle'); }
  get LibelleC() { return this.exform.get('LibelleC'); }
  get debit() { return this.exform.get('debit'); }
  get credit() { return this.exform.get('credit'); }
  colsfolio = [
    { field: "mv_mmc", header: "Mois",  width: "10%", display: "table-cell",  align: "center", size: "0.8em" },
    { field: "jl_code", header: "jlcode",  display: "none",  align: "left", size: "0.8em" },
    { field: "client", header: "Journal",  width: "80%", display: "table-cell",  align: "left", size: "0.8em" },
    { field: "mv_folio", header: "Folio",  width: "10%", display: "table-cell",  align: "right", size: "0.8em"  },

  ];
  cols = [
    { field: "mv_lig", header: "Lig",  width: "5%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_folio", header: "Mvt",  width: "6%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "abreg", header: "Jl",  width: "5%", display: "table-cell",  align: "center", size: "0.8em" },
    { field: "mv_date", header: "D.Ecriture",  width: "8%", display: "table-cell",  align: "center", size: "0.8em" },
    { field: "mv_piece", header: "Piece",  width: "6%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_libop", header: "Libelle ecriture",  width: "41%", display: "table-cell",  align: "left", size: "0.8em" },
    { field: "mv_montd", header: "Debit",  width: "8%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_littrage", header: "Let",  width: "5%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_montc", header: "Credit",  width: "8%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_aac", header: "Selection",  width: "8%", display: "table-cell",  align: "center", size: "0.8em" },

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
  @ViewChild("wcomptee2") wcomptee2lement: ElementRef;
  @ViewChild("wlibellee") wlibelleelement: ElementRef;
  @ViewChild("btnsumb") wbtnsumbelement: ElementRef;

  cities: any[]; selectedCity1: journal; selectedCity2: Journ;items: SelectItem[]; shower:any; selecteditem: mvtdetail;
  @ViewChild("namex") nameElement: ElementRef; @ViewChild("file") myInputVariable: ElementRef;
  selectedCar1: companyUser;displaycompte:boolean=false; codeid: number = 0;codeCompany:number=0;ifresult:number=0;
    angForm: FormGroup; userDetails; myFile: any;loading: boolean; message: string; result: any[]=[]; resultx: string[] = [];
  url: string; username: any;standarCompany: any;resulttele: any; progress: number;resultJOURNAL:any[]=[];resultCompany:any[]=[];
  wjour:number;wpiece:number=0;wcompte:string="";wlibelle:string="";wdebit:number;wcredit:number;wmvtmvt:number;
display:boolean=false;moiss:number=0;journn:number=0;wmois:number=0;wdu:string;
@ViewChild("dt33") public table: Table;wligne:number=0;wjourn:number=0;witchcompte:number=0;
filterFromUrl:string="";comptelibelle:string="";displayediter:boolean=false;comptedu:string="";compteau:string="";
comptelibelle2:string="";wconf:number=0;
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
 onChangeEvent(e){
   if (e.target.value > this.day){
    this.wjourelemlement.nativeElement.value = ' ';
    this.wjourelemlement.nativeElement.focus();

   }

 }
 compteEvent(event: any){
  this.wcompteelement.nativeElement.focus();
  }
  sumb(e){
    this.wbtnsumbelement.nativeElement.focus();
  }
  onChangecheck(e){
    let year = parseInt( localStorage.getItem("exercicecompany"));
    for (var t = 0; t < this.result.length; t++) {
      if (this.result[t]["mv_lig"] === e.mv_lig && this.result[t]["mv_aac"] === year)
      {
        this.result[t]["mv_aac"] = 0;
      }
      else
      {
          if (this.result[t]["mv_lig"] === e.mv_lig && this.result[t]["mv_aac"] === 0)
        {
          this.result[t]["mv_aac"] = year;
        }
    }

  }

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
      libelleEvent2(event: any){
        this.wconf = 2;
        this.filterFromUrl = this.compte2;
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

      this.comptelibelle2 = gg[0]["libelle"];
      this.compte2 = gg[0]["compteId"];

      this.display = false;
    }else{
      this.display = true;

    }

        }
  libelleEvent(event: any){
    this.wconf = 1;
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
  imprimer() {

 this.Spinner.show();
 let res = new Array<any>();
 res.push('wcompte');  res.push(this.compte);
 res.push('wcompte2');  res.push(this.compte2);
 res.push('wcomptename');  res.push(this.comptelibelle2);

 let iid:string;
 for (var t = 0; t < this.result.length; t++) {
    if(this.result[t]["mv_aac"] === 0){
       iid = iid + "," + this.result[t]["mv_lig"];
     }
  }

res.push('id');  res.push(iid);
res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
 this.resultx = []; this.resultx = res;
 this.service.getList("/fmvt/Getupdate2", this.resultx)
 .subscribe(
   (data:any) => {
     this.result = [];
     this.result=data;
     this.onSubmit();
iid ='';
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
  imprimerg() {
    this.Spinner.show();
    let res = new Array<any>();
    res.push('id'); res.push(this.comptedu);res.push('idau'); res.push(this.compteau);
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('datedu'); res.push(moment(this.datedu).format("MM/DD/YYYY"));
    res.push('dateau'); res.push(moment(this.dateau ).format("MM/DD/YYYY"));
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
       this.resultx = []; this.resultx = res;
      this.service.getList("/fmvt/CreatePDF1", this.resultx)
    .subscribe(
      (data:any) => {
        const arrayBuffer = this.base64ToArrayBuffer(data);
        this.createAndDownloadBlobFile(arrayBuffer, 'GrandLivre');
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
     //   console.log(JSON.stringify(data));

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
    if(this.wconf === 1){
    this.compte= e.data.compteId,
    this.comptelibelle= e.data.libelle;
    }
    if(this.wconf === 2){
      this.compte2= e.data.compteId,
      this.comptelibelle2= e.data.libelle;
      }
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

  }
  onSubmit() {
    this.Spinner.show();
    let res = new Array<any>();
    res.push('id');  res.push(this.compte);
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('datedu'); res.push(moment(this.datedu).format("MM/DD/YYYY"));
    res.push('dateau'); res.push(moment(this.dateau ).format("MM/DD/YYYY"));
    this.resultx = []; this.resultx = res;
    this.service.getList("/fmvt/GetAllcompte", this.resultx)
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
  setMenu(){
    localStorage.setItem("sousmenu","7");
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
      this.wdu = localStorage.getItem("exercicecompany");
      Promise.resolve("done")
        .then((val) => {this.setMenu()})
         .then((val) => { this.getcomptecomptable()})
        .catch((err) => console.error(err));

  }

}
