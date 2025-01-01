export interface Owners {
    name: string;
    social?: SocialMedia;
    designation: string[]
}

export interface Players {
    name: string;
    position: PositionType[];
    social?: SocialMedia;
    jerseyNumber?: number;
    rating?: number;
}

export interface SocialMedia {
    imagepath?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
}


export enum PositionType {
  Goalkeeper = 'GK',
  Defender = 'DF',
  Midfielder = 'MD',
  Forward = 'FW',
  Winger = 'AM',
  Striker = 'ST',
  FullBack = 'WB',
  CenterBack = 'CB',
  AttackingMidfielder = 'AM',
  DefensiveMidfielder = 'DM',
}

export enum PlayingPosition {
  Goalkeeper = 'GK',
  Defender = 'DF',
  Midfielder = 'MD',
  Forward = 'FW',
}

export function isPlayerByPosition(positionType: PositionType[], playingPostion:PlayingPosition){ 

    const allPositions: PositionType[] = getPlayingTypeByPosition(playingPostion)
    return allPositions.some(position => positionType.includes(position));
}

export function getPlayingTypeByPosition(playingPostion:PlayingPosition) :PositionType[] { 
    switch (playingPostion) {
        case PlayingPosition.Goalkeeper:
            return [PositionType.Goalkeeper]
        case PlayingPosition.Defender:
            return [PositionType.CenterBack, PositionType.CenterBack, PositionType.FullBack]
        case PlayingPosition.Midfielder:
            return [PositionType.Midfielder, PositionType.AttackingMidfielder]
        case PlayingPosition.Forward:
            return [PositionType.Striker, PositionType.Winger]
    }
}


export interface Team {
    id: string
    name: string;
    social?: SocialMedia;
    location: string;
}



export interface AwayTeam extends Team { }

export interface HomeTeam extends Team { }

export interface Match {
    homeTeam: Team,
    awayTeam: Team,
    homeTeamScore: Score,
    awayTeamScore: Score,
    matchType: MatchType,
    location: MatchLocation,
    matchTime: MatchTime,
    matchDuration: number,
     tournament?: Tournament
}

export interface MatchTime{
    day: number,
    month: number,
    year: number,
    hour: string,
}

export interface TournamentMatch extends Match {
  
}

export interface Tournament{
    name: string;
    social?: SocialMedia;
}

export enum MatchType {
    "FRIENDLY" = "FRIENDLY",
    "TOURNAMENT" = "TOURNAMENT"
}

export enum MatchLocation {
    "U.S.A" = "U.S.A",
    "LEES" = "LEES",
    "ABHUDHABI" = "ABHUDHABI",
    "NEUTRAL VENUE" =  "NEUTRAL VENUE"
}

export interface Score{
    score: number,
    scorer: MatchScorer[]
}
 
export interface MatchScorer{
    isOwnGoal? : boolean,
    scorer: Players,
    time? : string
 }