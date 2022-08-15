import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vet } from '../Models/appointmentVet.model';

@Injectable({
    providedIn: 'root',
  })
  export class VetProfileService {
    doctor :Vet;
    constructor(private http: HttpClient) {}

    getVetprofile(id) {
        var veturl = environment.vetURL;
        return this.http.get(`${veturl}/api/doctors/doctorprofile/${id}`).pipe(
          map((d) => {
            var doctor = d;
            console.log(doctor);
            return doctor;
          })
        );
      }

    updateVetprofile(data:any){
        var vetURL = environment.vetURL;
        this.http.put(`${vetURL}/api/Vets/UpdateVetDetails`,data).subscribe({
            next:(result) =>console.log(result),
            error:(err) =>console.log(err),
        });
    }
}