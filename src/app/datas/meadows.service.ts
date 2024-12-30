import { Injectable } from '@angular/core';
import { Players } from '../section/types/types';
import { PLAYER_abhishekPs, PLAYER_achu, PLAYER_adarshP, PLAYER_adarshVT, PLAYER_alenSanthosh, PLAYER_anas, PLAYER_baabiB, PLAYER_bibin, PLAYER_jeevan, PLAYER_jeevanRose, PLAYER_kannanS, PLAYER_kiranKarthikeyan, PLAYER_nithinPrasad, PLAYER_praju, PLAYER_pritu, PLAYER_saanuSt, PLAYER_sivaG, PLAYER_sreerag, PLAYER_stephin, PLAYER_sujeesh, PLAYER_vigneshR, PLAYER_VishnuDev } from './players';


@Injectable({
  providedIn: 'root'
})
export class MeadowsService {

  constructor() { }
  

  getOfficials() : Players[] {
    return [
      PLAYER_nithinPrasad,
      PLAYER_vigneshR,
      PLAYER_abhishekPs,
      PLAYER_jeevan,
      PLAYER_jeevanRose,
      PLAYER_adarshP,
      PLAYER_adarshVT,
      PLAYER_kiranKarthikeyan,
      PLAYER_VishnuDev,
      PLAYER_sivaG,
      PLAYER_alenSanthosh,
      PLAYER_sujeesh,
      PLAYER_pritu,
      PLAYER_praju,
      PLAYER_baabiB,
      PLAYER_kannanS,
      PLAYER_saanuSt,
      PLAYER_sreerag,
      PLAYER_stephin,
      PLAYER_bibin
      ]
  }


  getPlayers() : Players[] {
    return [
      PLAYER_jeevan,
      PLAYER_jeevanRose,
      PLAYER_baabiB,
      PLAYER_abhishekPs,
      PLAYER_adarshP,
      PLAYER_alenSanthosh,
      PLAYER_achu,
      PLAYER_alenSanthosh,
      PLAYER_kiranKarthikeyan,
      PLAYER_sivaG,
      PLAYER_nithinPrasad,
      PLAYER_vigneshR,
      PLAYER_praju,
      PLAYER_saanuSt,
      PLAYER_bibin,
      PLAYER_anas,
      PLAYER_pritu
      ]
  }

}
