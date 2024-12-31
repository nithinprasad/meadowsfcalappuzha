import { Component, Input, OnInit } from '@angular/core';
import { Players } from 'src/app/section/types/types';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  @Input()
  player!: Players;

  constructor() { }

  ngOnInit(): void {
  }

}
