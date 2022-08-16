import { formatDate } from '@angular/common';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentCard } from 'src/app/Models/appointmentCardModel';
import { ConsultationService } from 'src/app/Services/consultation.service';

@Component({
  selector: 'app-appointmentgridview',
  templateUrl: './appointmentgridview.component.html',
  styleUrls: ['./appointmentgridview.component.scss'],
})
export class AppointmentgridviewComponent implements OnInit, OnChanges {
  role = 'vet';
  @Input() filters: {
    status: string;
    startDate: string;
    endDate: string;
  };

  roleId: number = 1;
  fetchedAppointments: AppointmentCard[] = [];
  constructor(private service: ConsultationService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.filters);

    this.getAllAppointmentDetailsByRole(
      this.roleId,
      this.role,
      this.filters.startDate
        ? this.filters.startDate
        : formatDate(Date.now(), 'yyyy-MM-dd', 'en-US'),
      this.filters.endDate
        ? this.filters.endDate
        : formatDate(Date.now(), 'yyyy-MM-dd', 'en-US')
    );
  }

  ngOnChanges(): void {
    this.fetchedAppointments = [];
    if (this.filters.status == 'All') {
      this.getAllAppointmentDetailsByRole(
        this.roleId,
        this.role,
        this.filters.startDate
          ? this.filters.startDate
          : formatDate(Date.now(), 'yyyy-MM-dd', 'en-US'),
        this.filters.endDate
          ? this.filters.endDate
          : formatDate(Date.now(), 'yyyy-MM-dd', 'en-US')
      );
    } else {
      this.getAllAppointmentFiltered(
        this.roleId,
        this.filters.status,
        this.filters.startDate
          ? this.filters.startDate
          : formatDate(Date.now(), 'yyyy-MM-dd', 'en-US'),
        this.filters.endDate
          ? this.filters.endDate
          : formatDate(Date.now(), 'yyyy-MM-dd', 'en-US')
      );
    }
  }

  getAllAppointmentDetailsByRole(roleId, role, startDate, endDate) {
    this.service
      .getAllAppointmentsByRole(roleId, role, startDate, endDate)
      .subscribe({
        next: (res: any[]) => {
          for (var val of res) {
            this.fetchedAppointments.push(
              new AppointmentCard(
                val.appointmentId,
                val.PetName,
                val.Gender,
                val.OwnerName,
                val.AppointmentDate,
                val.AppointmentTime,
                val.PetDOB,
                val.VetName,
                val.VetSpeciality
              )
            );
          }
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }

  getAllAppointmentFiltered(vetId: number, status: string, startDate, endDate) {
    this.service
      .getAllAppointmentFilteredWithStatusAndDate(
        vetId,
        status,
        startDate,
        endDate
      )
      .subscribe({
        next: (res: any[]) => {
          for (var val of res) {
            this.fetchedAppointments.push(
              new AppointmentCard(
                val.appointmentId,
                val.PetName,
                val.Gender,
                val.OwnerName,
                val.AppointmentDate,
                val.AppointmentTime,
                val.PetDOB,
                val.VetName,
                val.VetSpeciality
              )
            );
          }
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }

  viewDetail(appointment: any) {
    let navigationExtras: NavigationExtras = {
      state: { appointmentId: appointment.AppointmentId },
    };
    this.router.navigate(['view-details'], navigationExtras);
  }
}
