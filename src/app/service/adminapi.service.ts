import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientModel } from '../patient.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  public headerData = new BehaviorSubject(false)
  

  updateHeader(datas:any){
    this.headerData.next(datas)
  }


  server_url = "https://hospital-care-server.onrender.com/patient"
  constructor(private http: HttpClient) { }

  authorization() {
    return this.http.get(`${this.server_url}/patient/1`)
  }
  addPatient(reqbody: PatientModel) {
    return this.http.post(`${this.server_url}/patient`, reqbody)
  }
  getPatient() {
    return this.http.get(`${this.server_url}/patient`)
  }
  deletePatient(id: string) {
    return this.http.delete(`${this.server_url}/patient/${id}`)
  }
  viewPatientDetails(id: any) {
    return this.http.get(`${this.server_url}/patient/${id}`)
  }
  updatePatient(id: any, reqbody: PatientModel) {
    return this.http.put(`${this.server_url}/patient/${id}`, reqbody)
  }
  updateAuthorization(reqbody:any) {
    return this.http.put(`${this.server_url}/patient/1`,reqbody)
  }
}
