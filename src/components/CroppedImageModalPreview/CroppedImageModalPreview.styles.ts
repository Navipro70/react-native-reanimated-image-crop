import {StyleSheet} from 'react-native';

import {SCREEN_WIDTH} from '../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    right: 16,
    top: 96,
    zIndex: 100,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH,
  },
});
