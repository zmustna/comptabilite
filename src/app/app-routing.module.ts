import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { HomepageviewComponent } from './Home/homepageview/homepageview.component';
import { ListofphotosComponent } from './Home/listofphotos/listofphotos.component';
import { UploadphotosComponent } from './Home/uploadphotos/uploadphotos.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ForgotpasswordComponent } from './User/forgotpassword/forgotpassword.component';
import { LoginComponent } from './User/login/login.component';
import { LoginandsignuppartialviewComponent } from './User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from './User/logoutpartialview/logoutpartialview.component';
import { RegisterComponent } from './User/register/register.component';
import { CompanyComponent } from './parametre/societe/company/company.component';
import { UserandmenuComponent } from './parametre/user/userandmenu/userandmenu.component';
import { UserandsmenuComponent } from './parametre/user/userandsmenu/userandsmenu/userandsmenu.component';
import { SettingglobalComponent } from './SettingGlobal/settingglobal/settingglobal.component';
import { CompanyGlobalComponent } from './SettingGlobal/CompanyGlobal/companyGlobal/companyGlobal.component';
import { EmailUserGlobalRepoComponent } from './SettingGlobal/EmailUserGlob/EmailUserGlobalRepo/EmailUserGlobalRepo.component';
import { PlancomptableComponent } from './base/plan/plancomptable/plancomptable.component';
import { MenuUserTComponent } from './SettingGlobal/MenuUserT/MenuUserT/MenuUserT.component';
import { JournalbaseComponent } from './base/journal/journalbase/journalbase.component';
import { SaisieComponent } from './Saisieglobal/saisiemvt/saisie/saisie.component';
import { TypecompteComponent } from './base/typecompte/typecompte/typecompte.component';
import { RadicalcompteComponent } from './base/radicalcompte/radicalcompte/radicalcompte.component';
import { TypejournalComponent } from './base/typejournal/typejournal/typejournal.component';
import { ComptebilantComponent } from './base/comptebilant/comptebilant.component';
import { SocieteComponent } from './societe/societe/societe.component';
import { ExerciceComponent } from './societe/exercice/exercice.component';
import { UserexerciceComponent } from './societe/Userexercice/Userexercice.component';
import {GrandlivreComponent} from './consultation/grandlivre/grandlivre.component';
import { JournauxComponent } from './consultation/journaux/journaux.component';
import { BalanceComponent } from './consultation/balance/balance.component';
import { LettrageComponent } from './lettrage/lettrage/lettrage.component';
import { CbanqueComponent } from './Saisieglobal/cbanquemvt/cbanque.component';
import { MensueljournalComponent } from './centralisation/mensueljournal/mensueljournal.component';
import { AnnuellejournauxComponent } from './centralisation/annuellejournaux/annuellejournaux.component';
import { RecompteComponent } from './redresment/recompte/recompte.component';

const routes: Routes = [
  //New Routing
  {path:'', component:HomepageComponent,children:[
    {path:'', component:HomepageviewComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgotpassword',component:ForgotpasswordComponent},
    {path:'listofimages',component:ListofphotosComponent, canActivate:[AuthorizationGuard]},
    {path:'uploadimages',component:UploadphotosComponent, canActivate:[AuthorizationGuard]},
    {path:'changepassword',component:UpdatepasswordComponent, canActivate:[AuthorizationGuard]},
    {path:'company',component:CompanyComponent, canActivate:[AuthorizationGuard]},
    {path:'userandmenu',component:UserandmenuComponent, canActivate:[AuthorizationGuard]},
    {path:'userandsmenu',component:UserandsmenuComponent, canActivate:[AuthorizationGuard]},
    {path:'settingglobal',component:SettingglobalComponent, canActivate:[AuthorizationGuard]},
    {path:'companyGlobal',component:CompanyGlobalComponent, canActivate:[AuthorizationGuard]},
    {path:'EmailUserGlobalRepo',component:EmailUserGlobalRepoComponent, canActivate:[AuthorizationGuard]},
    {path:'base',component:TypecompteComponent, canActivate:[AuthorizationGuard]},
    {path:'MenuUserT',component:MenuUserTComponent, canActivate:[AuthorizationGuard]},
    {path:'journaux',component:JournalbaseComponent, canActivate:[AuthorizationGuard]},
    {path:'saisie',component:SaisieComponent, canActivate:[AuthorizationGuard]},
    {path:'radicalc',component:RadicalcompteComponent, canActivate:[AuthorizationGuard]},
    {path:'typejournal',component:TypejournalComponent, canActivate:[AuthorizationGuard]},
    {path:'Ccomptable',component:ComptebilantComponent, canActivate:[AuthorizationGuard]},
    {path:'Plancomptable',component:PlancomptableComponent, canActivate:[AuthorizationGuard]},
    {path:'societeg',component:SocieteComponent, canActivate:[AuthorizationGuard]},
    {path:'exercice',component:ExerciceComponent, canActivate:[AuthorizationGuard]},
    {path:'Userexercice',component:UserexerciceComponent, canActivate:[AuthorizationGuard]},
    {path:'consultation',component:GrandlivreComponent, canActivate:[AuthorizationGuard]},
    {path:'Journaux',component:JournauxComponent, canActivate:[AuthorizationGuard]},
    {path:'Balance',component:BalanceComponent, canActivate:[AuthorizationGuard]},
    {path:'LCompte',component:LettrageComponent, canActivate:[AuthorizationGuard]},
    {path:'CBanque',component:CbanqueComponent, canActivate:[AuthorizationGuard]},
    {path:'centralisation',component:MensueljournalComponent, canActivate:[AuthorizationGuard]},
    {path:'annuelle',component:AnnuellejournauxComponent, canActivate:[AuthorizationGuard]},
    {path:'Rcompte',component:RecompteComponent, canActivate:[AuthorizationGuard]},
  ]},

  {path:'**',redirectTo:'/'},  {path:'**',component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
