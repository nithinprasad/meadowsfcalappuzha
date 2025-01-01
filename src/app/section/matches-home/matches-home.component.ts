import { Component, OnInit } from '@angular/core';
import { MathchDatasService } from 'src/app/datas/mathch-datas.service';
import { Match } from '../types/types';

@Component({
  selector: 'app-matches-home',
  templateUrl: './matches-home.component.html',
  styleUrls: ['./matches-home.component.css']
})
export class MatchesHomeComponent implements OnInit {

  constructor(private matchService: MathchDatasService) { }

  ngOnInit(): void {
  }

  getRecentMatch(): Match {
    return this.matchService.getMatches()[0];
  }

}
