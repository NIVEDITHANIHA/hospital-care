import { Component } from '@angular/core';
import { PatientModel } from '../patient.model';
import { AdminapiService } from '../service/adminapi.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-addform',
  templateUrl: './patient-addform.component.html',
  styleUrls: ['./patient-addform.component.css']
})
export class PatientAddformComponent {
  constructor(private api: AdminapiService ,private router :Router) { }

  patient: PatientModel = {}

  handleSubmit() {
    console.log(this.patient);

    if (!this.patient.id || !this.patient.name || !this.patient.email || !this.patient.status) {
      Swal.fire({
        title: "info!",
        text: "Fill the form.",
        icon: "info"
      });
    }
    else {
      this.api.addPatient(this.patient).subscribe({
        next: ((res: PatientModel) => {
          console.log(res);
          Swal.fire({
            title: "Wow!",
            text: `Succesfully Added ${res.name}`,
            icon: "success"
          });

          this.patient = {}
          this.router.navigateByUrl("/patient-detail")


        }),
        error: ((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        })
      })
    }





  }
  handleCancel() {
    this.patient = {}
    console.log(this.patient);

  }

}
