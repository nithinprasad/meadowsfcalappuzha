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