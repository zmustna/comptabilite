import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/AppServices/UserServices/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide=true;
  loading=false;

  registerationFrom: FormGroup;
  constructor(private userService: UserserviceService,
    private snackbar: MatSnackBar,
    private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    {
      this.router.navigateByUrl('/listofimages');
    }
    this.registerationFrom=new FormGroup({
      UserFullName: new FormControl(null, [Validators.minLength(3)]),
      UserName: new FormControl(null,Validators.email),
      Password: new FormControl(null,[Validators.minLength(6)]),
      confirmpassword:new FormControl(null,[Validators.minLength(6)])
    });
  }

  //getter method
  get UserFullName(){
    return this.registerationFrom.get('UserFullName') as FormControl;
  }
  get UserName(){
    return this.registerationFrom.get('UserName') as FormControl;
  }
  get Password(){
    return this.registerationFrom.get('Password') as FormControl;
  }
  get confirmpassword(){
    return this.registerationFrom.get('confirmpassword') as FormControl;
  }

  onsubmit(){
    if(this.registerationFrom.valid)
    {
      this.loading=true;
      this.userService.register(this.registerationFrom.value)
      .subscribe(
        (data:any) => {
          this.snackbar.open(data.message+' Activate your Account and Login now!', '?', {
            //duration:5000,
            horizontalPosition:'center',
            verticalPosition:'top'
          })
          this.snackbar._openedSnackBarRef.onAction().subscribe(()=>{
            this.loading = false;
          })
        },
        error => {
          this.snackbar.open(error.error.message, '?', {
            //duration:5000,
            horizontalPosition:'center',
            verticalPosition:'top'
          })
          this.snackbar._openedSnackBarRef.onAction().subscribe(()=>{
            this.loading = false;
          })
        }
      )
    }else{
      this.loading = true;
      this.snackbar.open('All Fields are Required with Valid Data!','?', {
        //duration:3000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
      this.snackbar._openedSnackBarRef.onAction().subscribe(()=>{
        this.loading = false;
      })
    }
  }

}
