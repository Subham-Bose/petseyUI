import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'all-appointments',
  templateUrl: './all-appointment.component.html',
  styleUrls: ['./all-appointment.component.scss']
})
export class AllAppointmentComponent implements OnInit {
  currentStatus: string = 'All';
  showGrid: boolean = true;
  role:string='vet';
  @Output() isGridView = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
  SelectChange(e) {
    this.currentStatus = e.target.value;
  }
  newAppointment() {
    this.isGridView.emit(false);
  }
}
