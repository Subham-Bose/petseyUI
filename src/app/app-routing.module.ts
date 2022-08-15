import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPetsVetsComponent } from './dashboard/all-pets-vets/all-pets-vets.component';
import { LoginComponent } from './login/login.component';
import { petParentList } from './Models/mockPetParent';
import { PetparentProfileComponent } from './petparent-profile/petparent-profile.component';
import { RecepProfileComponent } from './recep-profile/recep-profile.component';
import { SignupComponent } from './signup/signup.component';
import { VetProfileComponent } from './vet-profile/vet-profile.component';

const routes: Routes = [
 {path:'',redirectTo:'./login',pathMatch:'full'},
  {
    path:'login',component:LoginComponent
  },
  {path:'signup',component:SignupComponent},
  {path:'details',component:AllPetsVetsComponent},
  {path:'petparentprofile',component:PetparentProfileComponent},
  {path:'vetprofile',component:VetProfileComponent},
  {path:'recepprofile',component:RecepProfileComponent},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
