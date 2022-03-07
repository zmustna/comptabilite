import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/AppServices/UserServices/userservice.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {

  UpdatePasswords: FormGroup;
  constructor(private userservice:UserserviceService, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.UpdatePasswords = new FormGroup({
      OldPassword: new FormControl(null,[Validators.minLength(6),Validators.required]),
      NewPassword: new FormControl(null,[Validators.minLength(6),Validators.required])
    })
  }

  get OldPassword(){
    return this.UpdatePasswords.get('OldPassword') as FormControl;
  }
  get NewPassword(){
    return this.UpdatePasswords.get('NewPassword') as FormControl;
  }

  UpdatePassword(){
    if(this.UpdatePasswords.valid)
    {
      var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('userToken')});
      this.userservice.updatePassword(this.OldPassword.value,this.NewPassword.value,tokenHeader)
      .subscribe(
        (data:any) => {
          this.snackbar.open(data.message, '?', {
            duration:5000,
            horizontalPosition:'center',
            verticalPosition:'top'
          })
        }
      )
    }
  }

}
