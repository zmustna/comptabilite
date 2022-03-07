import { Injectable, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Deserialize } from 'cerialize';
@Injectable({
  providedIn: 'root'
})
export class UserGlobalService {
    @Input() emailuser;
    @Input() menuchoose;
    @Input() Descrption;
    @Input() companyname;
    options = {
        withCredentials: true

    };
    constructor(private fb: FormBuilder, private http: HttpClient) { }
      readonly BaseURI = 'https://localhost:44331/api';
     //   readonly BaseURI = 'http://zmustna66-002-site4.itempurl.com/api';
     //  readonly BaseURI = 'http://iquote5280.com/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

    getData(vin): Promise<any> {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };
        const api =
            'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/';
        const format = '?format=json';
        // NHTSA vin decoder API
        return (
            this.http
                .get(api + vin + format + config)
                .toPromise()
                // Deserialize JSON response to a typed object.
                .then(responseo => Deserialize(responseo))
                .catch()
        );
    }
  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('ConfirmPassword');
    // passwordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      }
      else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }
    getList(url, resultx: Array<any>) {
      const tokenHeader1 = new HttpHeaders(
        {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('userToken')
        });
      let params: HttpParams = new HttpParams();
      for (let i = 0; resultx.length > i; i++) {
            if (i % 2 !== 0) { params = params.append(resultx[i - 1], resultx[i]); }
        }
      return this.http.get<any>(this.BaseURI + url, {headers: tokenHeader1, params });
    }
    getResult(url) {
      const tokenHeader1 = new HttpHeaders(
        {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('userToken')
        });
      return this.http.get<any>(this.BaseURI + url, {headers: tokenHeader1});
    }
    getResultobj(myobg, e) {
        let ii = 0;
        myobg.forEach((value, key) => {
            if (value.codepaper === e) {
                ii = 1;
            }
           // console.log(JSON.stringify(value))
        });
        return ii;
    }
  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
    ExecutePost(action: string, data: any) {
      // tslint:disable-next-line: variable-name
      let _body = JSON.stringify(data);
      const tokenHeader1 = new HttpHeaders(
        {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('userToken')
        });

      return this.http.post<any>(this.BaseURI + action, _body, {headers: tokenHeader1});
   }
    login(formData) {
     //   console.log(this.BaseURI + "/ApplicationUser/Login   " + JSON.stringify(formData));
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }
    logout() {
        const fd = '';
        return this.http.post(this.BaseURI + '/ApplicationUser/Logout', fd);
    }
    getUserProfile() {
        return this.http.get(this.BaseURI + '/UserProfile');
  }
  getUsertable( nametable, nameroute) {
    return this.http.get(this.BaseURI + '/' + nametable + '/' + nameroute);
}
}
