import {Dimensions} from 'react-native';

export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('screen');

export const SMALLEST_SCREEN_SIDE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
