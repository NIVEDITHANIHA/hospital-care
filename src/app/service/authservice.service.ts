import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }

  isLogged(){
    /* [!!localStorage.getItem("name")] !! always return a boolean */
    return !!localStorage.getItem("name")
  }
}
