import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../patient.model';
import { AdminapiService } from '../service/adminapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-editform',
  templateUrl: './patient-editform.component.html',
  styleUrls: ['./patient-editform.component.css']
})
export class PatientEditformComponent implements OnInit {

  constructor(private api: AdminapiService, private route: ActivatedRoute ,private router :Router) { }

  patient: PatientModel = {}


  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const { id } = res
      console.log(id);
      this.viewPatients(id)

    })
  }

  viewPatients(id: any) {
    this.api.viewPatientDetails(id).subscribe({
      next: ((res) => {
        console.log(res);
        this.patient = res


      }),
      error: ((err) => {
        console.log(err);


      })
    })

  }

  cancelUpdate(id:any){
    this.viewPatients(id)

  }


  handleupdate(id: any) {
    if (!this.patient.id || !this.patient.name || !this.patient.email || !this.patient.status) {
      Swal.fire({
        title: "info!",
        text: "Fill the form.",
        icon: "info"
      });
    }
    else{

    
    this.api.updatePatient(id, this.patient).subscribe({
      next: ((res:any) => {
        console.log(res);
        Swal.fire({
          title: "Wow!",
          text: `Succesfully Updated ${res.name}`,
          icon: "success"
        });


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

 
}
