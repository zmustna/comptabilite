import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';
@Component({
  selector: 'app-menugeneral',
  templateUrl: './menugeneral.component.html',
  styleUrls: ['./menugeneral.component.scss']
})
export class MenugeneralComponent implements OnInit {
   constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private router: Router, private service: UserGlobalService, private toastr: ToastrService)
   {

   }
   navigateMenu(tag){
    if(tag === 'Item1'){
         this.router.navigate(['/company']);
        }
        if(tag === 'Item2'){
          this.router.navigate(['/userandmenu']);
         }
         if(tag === 'Item3'){
          this.router.navigate(['/userandsmenu']);
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
