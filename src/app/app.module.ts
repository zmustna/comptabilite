import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SharesModule} from "./ShareModels/Shares.model";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { ListofphotosComponent } from './Home/listofphotos/listofphotos.component';
import { UploadphotosComponent } from './Home/uploadphotos/uploadphotos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ValidateEqualModule } from 'ng-validate-equal';
import { HttpClientModule} from '@angular/common/http';
import { AuthorizationGuard } from './authorization.guard';
import { HomepageviewComponent } from './Home/homepageview/homepageview.component';
import { LoginandsignuppartialviewComponent } from './User/loginandsignuppartialview/loginandsignuppartialview.component';
import { ForgotpasswordComponent } from './User/forgotpassword/forgotpassword.component';
import { LogoutpartialviewComponent } from './User/logoutpartialview/logoutpartialview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSpinnerModule } from "ngx-spinner";
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { MatSidenavModule} from  '@angular/material/sidenav';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyComponent } from './parametre/societe/company/company.component';
import { ToastrModule } from 'ngx-toastr';
import { UserGlobalService } from './AppServices/ServiceGlobal/UserGlobalService';
import { UserandmenuComponent } from './parametre/user/userandmenu/userandmenu.component';
import { MenugeneralComponent } from './parametre/menu/menugeneral/menugeneral.component';
import { UserandsmenuComponent } from './parametre/user/userandsmenu/userandsmenu/userandsmenu.component';
import { SettingglobalComponent } from './SettingGlobal/settingglobal/settingglobal.component';
import { CompanyGlobalComponent } from './SettingGlobal/CompanyGlobal/companyGlobal/companyGlobal.component';
import { EmailUserGlobalRepoComponent } from './SettingGlobal/EmailUserGlob/EmailUserGlobalRepo/EmailUserGlobalRepo.component';
import { PlancomptableComponent } from './base/plan/plancomptable/plancomptable.component';
import { SousmenuComponent } from './parametre/sousmenu/sousmenu/sousmenu.component';
import { MenuadminComponent } from './parametre/menu/MenuAdmin/menuadmin/menuadmin.component';
import { MenuUserTComponent } from './SettingGlobal/MenuUserT/MenuUserT/MenuUserT.component';
import { JournalbaseComponent } from './base/journal/journalbase/journalbase.component';
import { SaisieComponent } from './Saisieglobal/saisiemvt/saisie/saisie.component';
import { TypecompteComponent } from './base/typecompte/typecompte/typecompte.component';
import {RadicalcompteComponent} from './base/radicalcompte/radicalcompte/radicalcompte.component';
import { ComptebilantComponent } from './base/comptebilant/comptebilant.component';
import { TypejournalComponent } from './base/typejournal/typejournal/typejournal.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SocieteComponent } from './societe/societe/societe.component';
import { ExerciceComponent } from './societe/exercice/exercice.component';
import { UserexerciceComponent } from './societe/Userexercice/Userexercice.component';
@NgModule({
  declarations: [
    AppComponent,CompanyComponent,UserandsmenuComponent,
    LoginComponent,MenugeneralComponent,SettingglobalComponent,
    RegisterComponent,CompanyGlobalComponent,EmailUserGlobalRepoComponent,
    HomepageComponent,PlancomptableComponent,MenuadminComponent,
    ListofphotosComponent,SousmenuComponent,MenuUserTComponent,
    UploadphotosComponent,SaisieComponent,
    HomepageviewComponent,TypejournalComponent,ComptebilantComponent,
    LoginandsignuppartialviewComponent,RadicalcompteComponent,
    ForgotpasswordComponent,TypecompteComponent,UserexerciceComponent,
    LogoutpartialviewComponent,JournalbaseComponent,ExerciceComponent,
      UpdatepasswordComponent,UserandmenuComponent,SocieteComponent
   ],
  imports: [
    MatSidenavModule,NgbModule,NgbButtonsModule,SharesModule, RippleModule,BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSnackBarModule,
    ValidateEqualModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxDropzoneModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
  })

  ],
  exports: [
    SharesModule
  ],
  providers: [AuthorizationGuard, UserGlobalService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }