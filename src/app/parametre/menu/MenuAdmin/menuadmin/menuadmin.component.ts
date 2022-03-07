import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.scss']
})
export class MenuadminComponent implements OnInit {
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private router: Router, private service: UserGlobalService, private toastr: ToastrService)
  {

  }
  navigateMenu(tag){
   if(tag === 'Item1'){
        this.router.navigate(['/settingglobal']);
       }
       if(tag === 'Item2'){
         this.router.navigate(['/EmailUserGlobalRepo']);
        }
        if(tag === 'Item3'){
         this.router.navigate(['/MenuUserT']);
        }
        if(tag === 'Item4'){
         this.router.navigate(['/companyGlobal']);
        }
        if(tag === 'Item5'){
         this.router.navigate(['/EmailUserGlobalRepo']);
        }
 }
 ngOnInit() {

 }

}
