
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

constructor(private http: HttpClient) { }

//baseURI = 'http://zmustna66-002-site4.itempurl.com/api/';
baseURI="https://localhost:44331/api/";

register(registerationForm){
  return this.http.post(this.baseURI+'Account/Register?Content-Type=application/json', registerationForm)
}

login(loginForm){
  return this.http.post(this.baseURI+'Account/Login',loginForm)
}

updatePassword(oldpass,newpass,headers){
  return this.http.get(this.baseURI+'Account/UserPasswordUpdate?oldpassword='+oldpass+'&newpassword='+newpass+'',{headers:headers})
}

forgotPassword(email){
  return this.http.get(this.baseURI+'Account/ForgotPassword?emaillink='+email+'')
}
}
