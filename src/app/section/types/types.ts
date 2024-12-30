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
}

export interface SocialMedia {
    imagepath?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
}


export enum PositionType {
  Goalkeeper = 'Goalkeeper',
  Defender = 'Defender',
  Midfielder = 'Midfielder',
  Forward = 'Forward',
  Winger = 'Winger',
  Striker = 'Striker',
  FullBack = 'FullBack',
  CenterBack = 'CenterBack',
  AttackingMidfielder = 'AttackingMidfielder',
  DefensiveMidfielder = 'DefensiveMidfielder',
}