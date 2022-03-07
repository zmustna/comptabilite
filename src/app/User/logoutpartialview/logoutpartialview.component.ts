import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginandsignuppartialviewComponent } from '../loginandsignuppartialview/loginandsignuppartialview.component';
import { HomepageComponent } from '../../Home/homepage/homepage.component';

@Component({
  selector: 'app-logoutpartialview',
  templateUrl: './logoutpartialview.component.html',
  styleUrls: ['./logoutpartialview.component.scss']
})
export class LogoutpartialviewComponent implements OnInit {

  confirmer;
  userName;
  constructor(private router:Router,private hell:HomepageComponent, private snackbar:MatSnackBar) { }

  ngOnInit() {
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
      this.userName = JSON.parse(window.atob(localStorage.getItem('userToken').split('.')[1])).Username;
    }
  }

  Logout(){
    this.confirmer = confirm("Are you sure to Log Out from Website?");
    if(this.confirmer==true){
      localStorage.removeItem('userToken');
      localStorage.removeItem('companyName');
      localStorage.removeItem('useremail');
      this.router.navigate(['/login']);
      this.hell.shower=LoginandsignuppartialviewComponent;
      window.location.reload();
      this.snackbar.open('Log Out Successfully!', '✖', {
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }
}

}
