import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserserviceService } from '../../AppServices/UserServices/userservice.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  ForgotpasswordForm: FormGroup;
  constructor(private userservice:UserserviceService, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.ForgotpasswordForm = new FormGroup({
      Email: new FormControl(null,[Validators.required,Validators.email])
    })
  }

  get Email(){
    return this.ForgotpasswordForm.get('Email') as FormControl;
  }

  SendResetPasswordLink(){
    if(this.ForgotpasswordForm.valid)
    {
      this.userservice.forgotPassword(this.Email.value)
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
