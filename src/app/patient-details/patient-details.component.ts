import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../service/adminapi.service';
import { PatientModel } from '../patient.model';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  p: number = 1;
  allPatients: PatientModel[] = [];
  searchkey: string = ""

  constructor(private api: AdminapiService) { }

  pdfGenerate() {
    const pdf = new jsPDF();

    let head = [['Patient Id', 'Name', 'Email', 'Status']]
    let body: any = []

    this.allPatients.forEach((items) => {
      body.push([items.id, items.name, items.email, items.status])
    })

    /* set the fontSize for pdf */
    pdf.setFontSize(16)
    /* Set the title for pdf */
    pdf.text("Patients Details", 10, 10)
    /* table */
    autoTable(pdf, { head, body })
    /* to Open in new tab */
    pdf.output('dataurlnewwindow')
    /* Save & download */
    pdf.save('patients.pdf')

  }


  getPatients() {
    this.api.getPatient().subscribe({
      next: ((res: any) => {
        console.log(res);
        this.allPatients = res
        console.log(this.allPatients);

      }),
      error: ((err) => {
        console.log(err);

      })
    })
  }



  deletePatients(id: any) {
    this.api.deletePatient(id).subscribe({
      next: ((res) => {
        console.log(res);
        this.getPatients()

      }),
      error: ((err) => {
        console.log(err);

      })
    })
  }

  sortById() {
    this.allPatients.sort((a: any, b: any) => a.id - b.id)

  }
  sortByName() {
    this.allPatients.sort((a: any, b: any) => a.name.localeCompare(b.name))

  }


  ngOnInit(): void {
    this.getPatients()

  }

}
