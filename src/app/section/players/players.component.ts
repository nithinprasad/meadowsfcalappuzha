import { Component, OnInit } from '@angular/core';
import { MeadowsService } from 'src/app/datas/meadows.service';
import { isPlayerByPosition, PlayingPosition, PositionType } from '../types/types';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
   PlayingPosition = PlayingPosition;
  constructor(private meadowsService:MeadowsService) { }

  ngOnInit(): void {
  }

  getPlayers(playingPostion: PlayingPosition) {
    return this.meadowsService.getPlayers().filter(player => isPlayerByPosition(player.position, playingPostion));
  }

  getAllPlayers() {
    return this.meadowsService.getPlayers();
  }

}
