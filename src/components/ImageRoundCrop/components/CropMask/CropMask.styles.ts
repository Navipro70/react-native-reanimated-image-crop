import {StyleSheet} from 'react-native';

import {CROP_SIZE} from '../../ImageRoundCrop.constants';

export const styles = StyleSheet.create({
  maskContentContainer: {
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskContent: {
    backgroundColor: 'white',
    borderRadius: CROP_SIZE / 2,
    width: CROP_SIZE,
    height: CROP_SIZE,
  },
});
