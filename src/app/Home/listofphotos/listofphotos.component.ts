import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeserviceService } from 'src/app/AppServices/HomeServices/homeservice.service';
import { LoginandsignuppartialviewComponent } from 'src/app/User/loginandsignuppartialview/loginandsignuppartialview.component';
import { LogoutpartialviewComponent } from 'src/app/User/logoutpartialview/logoutpartialview.component';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-listofphotos',
  templateUrl: './listofphotos.component.html',
  styleUrls: ['./listofphotos.component.scss'],
})
export class ListofphotosComponent implements OnInit {
  images;
  constructor(
    private homeservice: HomeserviceService,
    private snackbar: MatSnackBar,
    private Spinner: NgxSpinnerService,
    private listcomp: HomepageComponent
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem('userToken') != null &&
      localStorage.getItem('userToken') != 'null'
    ) {
      this.listcomp.shower = LogoutpartialviewComponent;
    } else {
      this.listcomp.shower = LoginandsignuppartialviewComponent;
    }

    this.Spinner.show();
    const tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    });
    this.homeservice.ListofPhotos(tokenHeader).subscribe(
      (data: any) => {
        this.images = data;
        this.Spinner.hide();
      },
      (err: any) => {
        this.Spinner.hide();
        this.snackbar.open('You are not Authorized Person to see list!', '?', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}
