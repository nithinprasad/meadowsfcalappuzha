import { Injectable } from '@angular/core';
import { HomeTeam, Match, MatchLocation, MatchType, TournamentMatch } from '../section/types/types';
import { FC_MEADOWS, FC_WE_ONE, TO_BE_CONFIRMED } from './teams';

@Injectable({
  providedIn: 'root'
})
export class MathchDatasService {

  constructor() { }

  getMatches(): (Match | TournamentMatch)[] { 
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


 getUpcomingMatches(): (Match | TournamentMatch)[] { 
    return [
      {
        awayTeam: TO_BE_CONFIRMED,
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
        matchDuration: 60,
        matchTime: {
          day: 2,
          month: 1,
          year: 2025,
          hour: "20:00 PM",
        },
        tournament: {
          name: "MTCIANS ALL KERALA 6's FOOTBALL TOURNAMENT"

        }
      }
    ]
  }
}
