import { Component } from '@angular/core';
import { AdminapiService } from '../service/adminapi.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private api: AdminapiService, private router: Router) { }

  email: string = "";
  password: string = "";

  login() {
    console.log("logined");

    if (!this.email || !this.password) {
      Swal.fire({
        title: "info!",
        text: "Fill the form.",
        icon: "info"
      });
    } else {
      this.api.authorization().subscribe({
        next: (res: any) => {
          console.log(res);
          const { email, password } = res;

          if (email === this.email && password === this.password) {
            /* to save the admin data in local  storage */
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)
            localStorage.setItem("name", res.name)

            Swal.fire({
              title: "Wow!",
              text: "Succesfully LogedIn.",
              icon: "success"
            });
            this.api.updateHeader({ datas: true })

            this.router.navigateByUrl("dashboard")



          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
    }
  }
}
