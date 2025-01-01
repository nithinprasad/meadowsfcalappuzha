import { Component, Input, OnInit } from '@angular/core';
import { Match, TournamentMatch } from 'src/app/section/types/types';

@Component({
  selector: 'app-upcoming-match',
  templateUrl: './upcoming-match.component.html',
  styleUrls: ['./upcoming-match.component.css']
})
export class UpcomingMatchComponent implements OnInit {


  @Input()
  match!: Match | TournamentMatch;
  constructor() { }

  ngOnInit(): void {
  }

}
