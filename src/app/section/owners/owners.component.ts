import { Component, OnInit } from '@angular/core';
import { Owners } from '../types/types';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getOwners(): Owners[] {
    return [
      {
        name: "Kiran Kr Parumala",
        designation: ["Owner"],
      },
      {
        name: "Jeevan Rose Pandanad",
        designation: ["Owner"],
      },
      {
        name: "Vishnu Dev Parumala ",
        designation: ["Manager"],
      }
    ]
  }
  
   checkImage(imagepath: string) {
     }

}
