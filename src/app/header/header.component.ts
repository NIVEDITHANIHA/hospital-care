import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from '../service/adminapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged: boolean = false
  constructor(private router: Router, private api: AdminapiService) {
    this.api.headerData.subscribe((datas:any) => {
      this.logged = datas
      console.log(this.logged );
      

    })

  }
  LogedOut() {
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    this.logged = false
    this.router.navigateByUrl("")

  }

}
