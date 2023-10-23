import {useCallback} from 'react';

import {ImageManager} from '../nativeModules/ImageManager/imageManager';

export const useSaveImage = () =>
  useCallback(
    async (
      url: string,
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      try {
        const imagePath = await ImageManager.saveImage(
          url,
          Math.round(x),
          Math.round(y),
          Math.round(width),
          Math.round(height),
        );
        return imagePath;
      } catch (e) {
        return null;
      }
    },
    [],
  );
