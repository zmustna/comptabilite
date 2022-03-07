import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

constructor(private http: HttpClient) { }

//baseURI = 'http://zmustna66-002-site4.itempurl.com/api/';
baseURI ="https://localhost:44331/api/";
ListofPhotos(tokenHeader){
  return this.http.get(this.baseURI+'Images/ListofPhots',{headers:tokenHeader})
}

UploadPictures(images,tokenHeader){
  return this.http.post(this.baseURI+'Images/SavingPhotos',images,{headers:tokenHeader})
}
MenuGlobal(tokenHeader){
  return this.http.get(this.baseURI+'Menu/GetAll',{headers:tokenHeader})
}

}
