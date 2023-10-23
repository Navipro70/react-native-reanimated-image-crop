import {useMemo, useState} from 'react';
import {OnLoadEvent} from 'react-native-fast-image';

type RealImageSize = OnLoadEvent['nativeEvent'] | null;

interface Props {
  containerWidth: number;
  containerHeight: number;
}

export const useImageLayout = ({containerWidth, containerHeight}: Props) => {
  const [realImageSize, setRealImageSize] = useState<RealImageSize>(null);

  /**
   * Calculate height, width for phone size and
   * realImageRatio - ratio of calculated size and real size
   */
  const imageSize = useMemo(() => {
    if (!realImageSize) {
      return {width: 0, height: 0, realImageRatio: 0};
    }

    if (realImageSize.width > realImageSize.height) {
      const aspectRatio = realImageSize.width / realImageSize.height;
      const width = Math.round(aspectRatio * containerHeight);
      const realImageRatio = realImageSize.width / width;

      return {height: containerHeight, width, realImageRatio};
    } else {
      const aspectRatio = realImageSize.height / realImageSize.width;
      const height = Math.round(aspectRatio * containerWidth);
      const realImageRatio = realImageSize.height / height;

      return {width: containerWidth, height, realImageRatio};
    }
  }, [realImageSize, containerWidth, containerHeight]);

  /**
   * Calculate image axises centers
   */
  const imageCenters = useMemo(
    () => ({centerX: imageSize.width / 2, centerY: imageSize.height / 2}),
    [imageSize],
  );

  return useMemo(
    () => ({
      ...imageSize,
      ...imageCenters,
      realImageRatio: realImageSize?.height ?? 0,
      onChangeImageSize: setRealImageSize,
    }),
    [imageCenters, imageSize, realImageSize],
  );
};
