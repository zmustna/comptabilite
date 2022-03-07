import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserGlobalService } from 'src/app/AppServices/ServiceGlobal/UserGlobalService';

@Component({
  selector: 'app-sousmenu',
  templateUrl: './sousmenu.component.html',
  styleUrls: ['./sousmenu.component.scss']
})
export class SousmenuComponent implements OnInit {
  menuItems = [];
  resultx: any[];
  constructor(private snackbar:MatSnackBar, private Spinner: NgxSpinnerService, private router: Router, private service: UserGlobalService, private toastr: ToastrService)
  {}
 getsousmenu(){

  let res = new Array<any>(); res.push('id'); res.push(localStorage.getItem('useremail'));
  res.push('Sid'); res.push(localStorage.getItem('sousmenu'));
  res.push('CompanyId'); res.push(localStorage.getItem('companycode'));
  this.resultx = []; this.resultx = res;
  this.Spinner.show();
    this.service.getList("/UserSousMenu/GetUserSousMenuApp", this.resultx)
  .subscribe(
    (data:any) => {
      this.menuItems=data;
      this.Spinner.hide();
    },
    (err:any)=>{
      this.Spinner.hide();
      this.snackbar.open('You are not Authorized Person to see Company!','?', {
        duration:4000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
    }
  )
}
ngOnInit() {
this.getsousmenu();
}
}
