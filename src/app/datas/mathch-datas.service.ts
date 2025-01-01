import { Injectable } from '@angular/core';
import { HomeTeam, Match, MatchLocation, MatchType } from '../section/types/types';
import { FC_MEADOWS, FC_WE_ONE } from './teams';

@Injectable({
  providedIn: 'root'
})
export class MathchDatasService {

  constructor() { }

  getMatches(): Match[] { 
    return [
      {
        awayTeam: FC_WE_ONE,
        homeTeam: FC_MEADOWS,
        matchType: MatchType.FRIENDLY,
        homeTeamScore: {
          score: 5,
          scorer: []
        },
        awayTeamScore: {
          score: 7,
          scorer: []
        },
        location: MatchLocation['U.S.A'],
        matchDuration: 60,
        matchTime: {
          day: 20,
          month: 12,
          year: 2024,
          hour: "20:00 PM",
        }
      }
    ]
  }
}
