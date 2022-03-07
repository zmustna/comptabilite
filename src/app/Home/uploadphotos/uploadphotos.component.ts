import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HomeserviceService } from 'src/app/AppServices/HomeServices/homeservice.service';

@Component({
  selector: 'app-uploadphotos',
  templateUrl: './uploadphotos.component.html',
  styleUrls: ['./uploadphotos.component.scss']
})
export class UploadphotosComponent implements OnInit {


  //imagesform: FormGroup;
  files: File[] = [];
  images: string[] = [];
  constructor(private http: HttpClient,private homeservices: HomeserviceService, private snackbar:MatSnackBar, private router: Router) { }

  ngOnInit() {
    // if(localStorage.getItem('userToken') != null && localStorage.getItem('userToken') != "null")
    // {
    //   this.router.navigateByUrl('/Home');
    // }
  }

	onSelect(event) {
    //console.log(this.images);
    if(this.images.length+event.addedFiles.length>10)
    {
      alert('Max 10 Files are allowed!');
    }else{
      this.images=[];
      const ctx = this;
      ctx.files.push(...event.addedFiles);
      for (var i = 0; i < ctx.files.length; i++) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          const img = document.createElement("img") as HTMLImageElement;
          img.src = reader.result as string;
          ctx.images.push(img.src);
        }, false);
        reader.readAsDataURL(ctx.files[i]);
      }
      //console.log(this.images);
    }
	}

	onRemove(event) {

    const posiiton = this.files.indexOf(event);
    this.files.splice(posiiton, 1);
    this.images.splice(posiiton, 1);
    //console.log(this.images);
  }

  UploadPictures(){
    if(this.images.length!=0)
    {
      const tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('userToken')});
      this.homeservices.UploadPictures(this.images,tokenHeader)
      .subscribe(
        (data:any) => {
          this.router.navigate(['/listofimages']),
          this.snackbar.open(data.message,'?', {
            duration:4000,
            horizontalPosition:'center',
            verticalPosition:'top'
          })
        },
        (err:any) => {
          this.snackbar.open('You are not Authorized Person to Upload Pictures!','?', {
            duration:4000,
            horizontalPosition:'center',
            verticalPosition:'top'
          })
        }
      )
    }else{
      alert('Select at least one Photo to Upload');
    }
  }

}

