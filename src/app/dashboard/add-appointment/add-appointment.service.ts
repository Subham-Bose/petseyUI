import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pets } from "src/app/Models/mockPets";
import { petParentList } from "src/app/Models/mockPetParent";
import { PetParent } from "src/app/Models/appointmentPetParent.model";
import { Pet } from "src/app/Models/appointmentPet.model";


@Injectable({
    providedIn: 'root'
})
export class AppointmentService{
    constructor(private http:HttpClient){}
    getAllParent() {
        const parent:PetParent[] = petParentList;
        return parent;
    }
    getAllPetsByParent(){
        const petList:Pet[] = Pets;
        return petList;
    }

    createAppointment(data: any) {
        const url = "https://localhost:44398/api/appointments/appointment/create";
        return this.http.post(url, data);
    }
}