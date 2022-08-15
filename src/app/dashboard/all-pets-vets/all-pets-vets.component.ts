import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pets-vets',
  templateUrl: './all-pets-vets.component.html',
  styleUrls: ['./all-pets-vets.component.scss']
})
export class AllPetsVetsComponent implements OnInit {
  role:string = 'vet';
  constructor() { }

  ngOnInit(): void {
  }
  searchdetails(){
    
  }
}
