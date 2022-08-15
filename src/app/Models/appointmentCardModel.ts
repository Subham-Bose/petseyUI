import { Time } from "@angular/common";

export class AppointmentCard{
    appointmentID:number;
    petName:string;
    gender:string;
    ownerName:string;
    appointmentDate:Date;
    appointmentTime:Time;
    petDOB:Date;
    vetName:string;
    vetSpeciality:string;
    constructor(appointmentId:number,
        pname:string,
        gender:string,
        owner:string,
        appointmentDate:Date,
        appointmentTime:Time,
        petDOB:Date,
        vetName:string,
        vetSpeciality:string
        )
    {
        this.appointmentDate = appointmentDate,
        this.appointmentID = appointmentId,
        this.appointmentTime = appointmentTime,
        this.gender = gender,
        this.ownerName = owner,
        this.petDOB = petDOB,
        this.petName = pname,
        this.vetName = vetName,
        this.vetSpeciality = vetSpeciality
    }       
}
        