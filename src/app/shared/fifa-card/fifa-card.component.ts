import { Component, Input, OnInit } from '@angular/core';
import { Players } from 'src/app/section/types/types';

@Component({
  selector: 'app-fifa-card',
  templateUrl: './fifa-card.component.html',
  styleUrls: ['./fifa-card.component.css']
})
export class FifaCardComponent implements OnInit {

  @Input()
  player!: Players;
  constructor() { }

  ngOnInit(): void {
  }

  getPlayerImage(player: Players) {
      return player.social?.imagepath ?? 'https://robohash.org/'+player.name+'.png';
  }

}
