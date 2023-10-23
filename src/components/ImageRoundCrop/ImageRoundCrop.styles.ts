import {StyleSheet} from 'react-native';

import {
  CROP_OFFSET,
  CROP_SIZE,
  CROP_CONTAINER_HEIGHT,
  CROP_CONTAINER_WIDTH,
} from './ImageRoundCrop.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: CROP_CONTAINER_WIDTH,
    height: CROP_CONTAINER_HEIGHT,
    overflow: 'hidden',
  },
  crop: {
    ...StyleSheet.absoluteFillObject,
    top: CROP_OFFSET,
    left: CROP_OFFSET,
    backgroundColor: 'rgba(1, 1, 1, 0.33)',
    zIndex: 1,
    width: CROP_SIZE,
    height: CROP_SIZE,
    borderRadius: CROP_SIZE / 2,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    zIndex: 2,
  },
});
