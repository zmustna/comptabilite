import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
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
import { CompteComptablex } from "../../../Models/base/compteComptablex";
import { journal } from '../../../Models/base/journal';
interface City {
  name: string,
  code: string
}
interface Journ {
  jl_design: string,
  jL_code: number
}
@Component({
  selector: "app-saisie",
  templateUrl: "./saisie.component.html",
  styleUrls: ["./saisie.component.scss"]
})

export class SaisieComponent implements OnInit {
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
  wlettrage: any;
  worgine: number;

  clicksub(){
  //  console.log(this.exform.value);
    this.exform.reset();
  }
  get mois() { return this.exform.get('mois'); }
  get journal() { return this.exform.get('journal'); }
  get mouvement() { return this.exform.get('mouvement'); }
  get compte() { return this.exform.get('compte'); }
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
    { field: "mV_jopt", header: "Jour",  width: "5%", display: "table-cell",  align: "center", size: "0.8em" },
    { field: "mv_piece", header: "Piece",  width: "6%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_compt", header: "Compte",  width: "8%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "client", header: "Compte Libelle",  width: "19%", display: "table-cell",  align: "left", size: "0.8em" },
    { field: "mv_libop", header: "Libelle",  width: "37%", display: "table-cell",  align: "left", size: "0.8em" },
    { field: "mv_montd", header: "Debit",  width: "9%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_montc", header: "Credit",  width: "9%", display: "table-cell",  align: "right", size: "0.8em" },
    { field: "mv_folio", header: "Action", display: "none",  align: "left", size: "0.8em" },
    { field: "mv_lig", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "mv_mmc", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "mv_aac", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "jl_code", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "mv_cheq", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "mv_littrage", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "companyId", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "mv_date", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "annee", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "FACTURE", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "mv_datec", header: "Action",  display: "none",  align: "left", size: "0.8em" },
    { field: "", header: "Supprimer",  width: "8%", display: "table-cell",  align: "center", size: "0.8em" },
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
display:boolean=false;moiss:number=0;journn:number=0;wmois:number=0;mycheck:boolean=false;
@ViewChild("dt33") public table: Table;wligne:number=0;wjourn:number=0;mycode:number=0;
filterFromUrl:string="";comptelibelle:string="";comptelibelle2:string="";compte2:string="";

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
  libelleEvent(event: any, b){
 if(b === 0) this.worgine = 0;
 if(b === 1) this.worgine = 1;
   // console.log(this.angForm.value.compte);
   if (b === 0)  this.filterFromUrl = this.angForm.value.compte;
   if (b === 1)  this.filterFromUrl = this.compte2;
    let wcompte=this.filterFromUrl.length;
   // console.log("this zalal : " + wcompte);
       if(wcompte < 10){
         for (let index = wcompte; index < 10; index++)
          {
            this.filterFromUrl = this.filterFromUrl + "0";
          }
       }
       if(b === 0){
       this.angForm.setValue({ jour: this.angForm.value.jour,
        piece:this.angForm.value.piece,compte: this.filterFromUrl,
        libelle:this.angForm.value.libelle,
        debit:this.angForm.value.debit,credit:this.angForm.value.credit
       });
      }
  let filtered = roleParam => this.resultCompany.some( ({compteId}) => compteId == roleParam)
let gg = this.resultCompany.filter( ({compteId}) => compteId == this.filterFromUrl);

if (filtered(this.filterFromUrl)){
  if(b === 0){
  this.comptelibelle = gg[0]["libelle"];
  this.wlibelleelement.nativeElement.focus(); this.mycode = 1;
  }
  if (b === 1){
    this.comptelibelle2 = gg[0]["libelle"];
  }
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
  deleteid(e) {
    let res = new Array<any>();
    res.push('wyear'); res.push(parseInt( localStorage.getItem("exercicecompany")));
    res.push('folio');  res.push(this.wmvtmvt);
    res.push('journ');  res.push(this.wjourn); res.push('ligne');  res.push(e.mv_lig);
    res.push('company'); res.push( parseInt( localStorage.getItem("companycode")));
    this.resultx = []; this.resultx = res;
    this.Spinner.show(); this.result = [];
      this.service.getList("/fmvt/Getdeleteid", this.resultx)
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
  imprimer() {
    let res = new Array<any>(); res.push("useremail"); res.push(localStorage.getItem("useremail"));
    res.push("CompanyId"); res.push(this.codeCompany.toString());
    res.push("companyname");res.push(localStorage.getItem("namecompany"));
     this.resultx = []; this.resultx = res;
    this.Spinner.show();
      this.service.getList("/CompteComptable/Printreport", this.resultx)
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
  this.mycode = 0;
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
  selectrowchoosefolio(e){
    this.wmvtmvt = e.data.mv_folio;
    this.journn = parseInt(e.data.jl_code);
    this.wjourn = e.data.jl_code;
  this.moiss = e.data.mv_mmc;
  this.wmois = e.data.mv_mmc;
  let month = this.moiss;
  let year = parseInt( localStorage.getItem("exercicecompany"));
  this.day = new Date(year, month, 0).getDate();
  console.log(this.day);
    this.getmvtdetailfolio();
    this.displayfolio = false;
     }
  selectrowchoose2(e){
if(this.worgine === 0){
    this.angForm.setValue({ jour: this.angForm.value.jour,
                         piece:this.angForm.value.piece,compte: e.data.compteId,
                         libelle:this.angForm.value.libelle,
                         debit:this.angForm.value.debit,credit:this.angForm.value.credit
                        });
    this.comptelibelle= e.data.libelle;this.mycode =1;
    this.wlibelleelement.nativeElement.focus();
                      }
                      if(this.worgine === 1){
                        this.comptelibelle2= e.data.libelle;
                        this.compte2 = e.data.compteId;
                                          }
    this.display = false;
  }
  selectrow(e) {
    this.angForm.setValue({ jour: e.data.mV_jopt,
      piece:e.data.mv_piece,compte: e.data.mv_compt,
      libelle:e.data.mv_libop,
      debit:e.data.mv_montd,credit:e.data.mv_montc
     });
    this.wlettrage = e.data.mv_littrage; this.mycode = 1;
    this.codeid=e.data.mv_lig;this.comptelibelle= e.data.client;

    this.wjourelemlement.nativeElement.focus();

  }
  onChangecheck(e){
    if(this.mycheck === false){
      this.compte2 = ""; this.comptelibelle2 ="";
    }
  }
  onRowEditCancel(rowData){

  }
  onSubmit() {
    this.Spinner.show();
     let fiile = new mvtdetail(); let i = 0;
      fiile.jl_code = parseInt(this.journn.toString());
     fiile.companyId =parseInt( localStorage.getItem("companycode"));
      fiile.mv_libop =  this.angForm.value.libelle;
      fiile.mV_jopt =  parseInt(this.angForm.value.jour);
      fiile.mv_compt = this.angForm.value.compte;
      fiile.mv_piece = parseInt(this.angForm.value.piece);
      fiile.mv_mmc = this.moiss;
      fiile.mv_folio = this.wmvtmvt;
      fiile.client=this.comptelibelle;
      fiile.mv_montd =  parseFloat(this.angForm.value.debit);

      if(this.codeid === 0){
        fiile.mv_littrage = 0;

      }else{
       fiile.mv_lig = this.codeid;

       fiile.mv_littrage=this.wlettrage;
      }

      fiile.annee = parseInt( localStorage.getItem("exercicecompany"));
      fiile.mv_montc = parseFloat(this.angForm.value.credit);
      fiile.mv_aac = parseInt( localStorage.getItem("exercicecompany"));
      fiile.mV_UTILIS =  localStorage.getItem("useremail");
      fiile.mv_date = new Date(fiile.mv_aac, fiile.mv_mmc, fiile.mV_jopt, 0, 0, 0, 0);
      fiile.mv_lig = this.codeid;
      if(Number.isInteger(fiile.mv_montd) === false) fiile.mv_montd = 0;
      if(Number.isInteger(fiile.mv_montc) === false) fiile.mv_montc = 0;
      //console.log(JSON.stringify(fiile));
      this.service.ExecutePost("/fmvt/Update", fiile).subscribe(() => {
      if (i === 0) {
        if(this.mycheck === true){
          this.onSubmit2();

        }else{
          this.wligne = 0; this.angForm.reset();this.comptelibelle = "";this.codeid = 0;this.wlettrage='';this.mycode =0;
          this.getmvtdetailfolio();
          this.Spinner.hide();
        }


      } else {
      }

    }, err =>{
      console.error(err);
      this.Spinner.hide();
    }

    );

  }
  onSubmit2() {
    this.Spinner.show();
     let fiile = new mvtdetail(); let i = 0;
      fiile.jl_code = parseInt(this.journn.toString());
     fiile.companyId =parseInt( localStorage.getItem("companycode"));
      fiile.mv_libop =  this.angForm.value.libelle;
      fiile.mV_jopt =  parseInt(this.angForm.value.jour);
      fiile.mv_compt = this.compte2;
      fiile.mv_piece = parseInt(this.angForm.value.piece);
      fiile.mv_mmc = this.moiss;
      fiile.mv_folio = this.wmvtmvt;
      fiile.client=this.comptelibelle2;
      fiile.mv_montd =  parseFloat(this.angForm.value.credit);

      if(this.codeid === 0){
        fiile.mv_littrage = 0;

      }else{
       fiile.mv_lig = this.codeid;

       fiile.mv_littrage=this.wlettrage;
      }

      fiile.annee = parseInt( localStorage.getItem("exercicecompany"));
      fiile.mv_montc = parseFloat(this.angForm.value.debit);
      fiile.mv_aac = parseInt( localStorage.getItem("exercicecompany"));
      fiile.mV_UTILIS =  localStorage.getItem("useremail");
      fiile.mv_date = new Date(fiile.mv_aac, fiile.mv_mmc, fiile.mV_jopt, 0, 0, 0, 0);
      fiile.mv_lig = this.codeid;
      if(Number.isInteger(fiile.mv_montd) === false) fiile.mv_montd = 0;
      if(Number.isInteger(fiile.mv_montc) === false) fiile.mv_montc = 0;
      //console.log(JSON.stringify(fiile));
      this.service.ExecutePost("/fmvt/Update", fiile).subscribe(() => {
      if (i === 0) {
          this.wligne = 0; this.angForm.reset();this.comptelibelle = "";this.codeid = 0;this.wlettrage='';this.mycode =0;
          this.getmvtdetailfolio();
          this.Spinner.hide();

      } else {
      }

    }, err =>{
      console.error(err);
      this.Spinner.hide();
    }

    );

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
    localStorage.setItem("sousmenu","3");
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
         .then((val) => { this.getcomptecomptable()})
        .catch((err) => console.error(err));

  }

}
