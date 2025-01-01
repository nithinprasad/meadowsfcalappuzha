import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/section/types/types';

@Component({
  selector: 'app-match-score-card',
  templateUrl: './match-score-card.component.html',
  styleUrls: ['./match-score-card.component.css']
})
export class MatchScoreCardComponent implements OnInit {


  @Input()
  match!: Match;
  constructor() { }

  ngOnInit(): void {
  }

}
