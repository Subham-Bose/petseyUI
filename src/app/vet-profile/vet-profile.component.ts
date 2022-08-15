import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Contact } from '../Models/VetContact';
import {VetProfile } from '../Models/vetProfile.model';
import { VetProfileService } from '../Services/vet.service';

@Component({
  selector: 'app-vet-profile',
  templateUrl: './vet-profile.component.html',
  styleUrls: ['./vet-profile.component.scss']
})
export class VetProfileComponent implements OnInit {
  doctorform: FormGroup;
  editable: boolean;
  doctor: any;
  temp: string | ArrayBuffer | null = '';
  VetId: 1;
  constructor(
    public formBuilder: FormBuilder,
    private service: VetProfileService

  ) { }

  ngOnInit(): void {

    this.doctorform = this.formBuilder.group({
      doctor_name: new FormControl(''),
      doctor_phone_number: new FormControl(''),
      doctor_email_id: new FormControl(''),
      doctor_npi_no: new FormControl(''),
      doctor_practice_location: new FormControl(''),
    });

    this.service.getVetprofile(this.VetId).subscribe({
      next: (res) => {
        this.doctor = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.doctorform.patchValue({
          doctor_name: this.doctor.vet_name,
          doctor_phone_number: this.doctor.ContactDetails.doctor_phone_number,
          doctor_email_id: this.doctor.ContactDetails.doctor_email_id,
          doctor_speciality: this.doctor.vetSpeciality,
          doctor_npi_no: this.doctor.doctor_npi_no,
          doctor_practice_location: this.doctor.ContactDetails.doctor_ClinicAddress
        });
      }
    });
  }
  OnClick1(){
    this.editable = !this.editable;
  }
  OnClick2(){
    this.editable = !this.editable;
   
  }

}
