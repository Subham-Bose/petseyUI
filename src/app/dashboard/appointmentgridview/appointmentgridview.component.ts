import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentCard } from 'src/app/Models/appointmentCardModel';
import { ConsultationService } from 'src/app/Services/consultation.service';

@Component({
  selector: 'app-appointmentgridview',
  templateUrl: './appointmentgridview.component.html',
  styleUrls: ['./appointmentgridview.component.scss']
})
export class AppointmentgridviewComponent implements OnInit {
  role = "vet";
  @Input() status = '';
  roleId: number = 1;
  fetchedAppointments: AppointmentCard[] = [];
 // fetchedAppointments:any;
  constructor(private service: ConsultationService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  //  this.service.getAllAppointmentsByRole(this.roleId,this.role).subscribe({
  //   next:(res) => {
  //     this.fetchedAppointments = res;
  //     console.log(res);
  //   },
  //   error(err) {
  //       console.log(err);
  //   },
  //  })
  this.getAllAppointmentDetailsByRole(this.roleId,this.role);

  }
  getAllAppointmentDetailsByRole(roleId, role) {
    this.service.getAllAppointmentsByRole(roleId, role)
      .subscribe({
        next: (res:any[]) => {
          for (var val of res ) {
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
                val.VetSpeciality,
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
