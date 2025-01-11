import { Injectable } from '@angular/core';
import { HomeTeam, Match, MatchLocation, MatchType, TournamentMatch } from '../section/types/types';
import { FC_MEADOWS, FC_PEROOR, FC_WE_ONE, TO_BE_CONFIRMED } from './teams';

@Injectable({
  providedIn: 'root'
})
export class MathchDatasService {

  constructor() { }

  getMatches(): (Match | TournamentMatch)[] { 
    return [
      {
        awayTeam: FC_PEROOR,
        homeTeam: FC_MEADOWS,
        matchType: MatchType.TOURNAMENT,
        homeTeamScore: {
          score: 0,
          scorer: []
        },
        awayTeamScore: {
          score: 0,
          scorer: []
        },
        location: MatchLocation.ABHUDHABI,
        matchDuration: 20,
        matchTime: {
          day: 2,
          month: 1,
          year: 2025,
          hour: "20:00 PM",
        }
      }
    ]
  }


 getUpcomingMatches(): (Match | TournamentMatch)[] { 
    return [
      {
        awayTeam: FC_MEADOWS,
        homeTeam: FC_MEADOWS,
        matchType: MatchType.FRIENDLY,
        homeTeamScore: {
          score: 0,
          scorer: []
        },
        awayTeamScore: {
          score: 0,
          scorer: []
        },
        location: MatchLocation.LEES,
        matchDuration: 60,
        matchTime: {
          day: 11,
          month: 1,
          year: 2025,
          hour: "22:00 PM",
        },
        tournament: {
          name: "Meadows Internal Community game"

        }
      }
    ]
  }
}
