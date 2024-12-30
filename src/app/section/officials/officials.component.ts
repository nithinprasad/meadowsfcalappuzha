import { Component, OnInit } from '@angular/core';
import { MeadowsService } from 'src/app/datas/meadows.service';
import { Players } from '../types/types';

@Component({
  selector: 'app-officials',
  templateUrl: './officials.component.html',
  styleUrls: ['./officials.component.css']
})
export class OfficialsComponent implements OnInit {

  constructor(private meadowsService:MeadowsService) { }

  ngOnInit(): void {
  }

  getOfficials(): Players[] { 
    return this.meadowsService.getOfficials();
  }

}
