import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from 'src/app/Models/appointmentPet.model';
import { PetParent } from 'src/app/Models/appointmentPetParent.model';
import { Vet } from 'src/app/Models/appointmentVet.model';
import { AppointmentService } from './add-appointment.service';

@Component({
  selector: 'add-appointments',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentsComponent implements OnInit {
  @Output() isGridView = new EventEmitter<boolean>();
  inputValue: string = '';
  vetId = '';
  vetName = '';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  appointmentForm: FormGroup;

  issues: string[];
  petIssue: string;

  selected: Date | null;
  timeArray = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  petParents: PetParent[];
  petList:Pet[];

  constructor(
    private fb: FormBuilder,
    private service: AppointmentService,
    private datepipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      appointmentDate: new FormControl(),
      appointmentTime: new FormControl(),
      issue: new FormControl(),
      reason: new FormControl(),
      pet: new FormControl(),
      parent: new FormControl(),
      vet: new FormControl(),

    })
    this.petList = this.service.getAllPetsByParent();
    this.petParents = this.service.getAllParent();
    this.appointmentForm.patchValue({
      vet: new Vet(1, "Dr. Kumar", "Navle", "99999")
    })

    this.vetId = JSON.parse(localStorage.getItem('vetId'));
    this.vetName = JSON.parse(localStorage.getItem('vetName'));
  }

  displayFnForpet(pet: Pet): string {
    return pet && pet.petName ? pet.petName : '';
  }
  displayFnParent(parent: PetParent) {
    return parent && parent.parentName ? parent.parentName : "";
  }

  changeScreen() {
    this.isGridView.emit(true);
  }

  submitForm(){
    console.log(this.appointmentForm.value);  
    this.service.createAppointment(this.appointmentForm.value).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)              
    })  
  }

  OnInput($event) {
    this.petIssue = $event.target.value;
  }
  removeIssue() {
    this.petIssue = null;
  }
  removeReason() {
    this.secondFormGroup.patchValue({
      reason: '',
    });
  }
  OnIssuesSelect() {
    this.secondFormGroup.patchValue({
      issues: this.petIssue,
    });
  }
  updateFormDate(event: any) {
    var date = this.datepipe.transform(event, 'yyyy-MM-dd');
    this.appointmentForm.get('appointmentDate').setValue(date);
  }
  updateFormTime(data) {
    this.appointmentForm.get('appointmentTime').setValue(data);
  }
  ConfirmAppointment() {
    var data = {
      AppointmentDate: this.thirdFormGroup.get('date').value,
      AppointmentTime: this.thirdFormGroup.get('time').value,
      Reason: this.secondFormGroup.get('reason').value,
      Issue: this.secondFormGroup.get('issue').value,
      VetId: this.vetId,
      VetName: this.vetName,
      petId: this.firstFormGroup.get('petDetail').value.Id,
      petName: this.firstFormGroup.get('petDetail').value.Name,
    };
  }
}
