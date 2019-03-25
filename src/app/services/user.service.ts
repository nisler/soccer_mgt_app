import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {

    // // Get All Users
    // this.http.get('https://1d59ipr7q8.execute-api.us-east-2.amazonaws.com/production/users').subscribe((data) => {
    //   console.log(data);
    // });
    
    // // Get User by Id
    // this.http.get('https://1d59ipr7q8.execute-api.us-east-2.amazonaws.com/production/users/2').subscribe((data) => {
    //   console.log(data);
    // });

    // // Get All Teams for User by Id
    // this.http.get('https://1d59ipr7q8.execute-api.us-east-2.amazonaws.com/production/users/2/teams').subscribe((data) => {
    //   console.log(data);
    // });

    // // Post User
    // this.http.post('https://1d59ipr7q8.execute-api.us-east-2.amazonaws.com/production/users', 
    // {"firstname":"Qwer",
    //   "lastname":"Qwer", 
    //   "password":"qwerqwer", 
    //   "phone":"1234123412", 
    //   "email":"oinwefwe@lskdfsd.com"}).subscribe((data) => {
    //   console.log(data)
    // });

  }
}
