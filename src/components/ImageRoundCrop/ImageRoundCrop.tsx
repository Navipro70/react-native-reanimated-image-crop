import React, {memo, useCallback, useMemo} from 'react';
import {Button, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import FastImage, {OnLoadEvent} from 'react-native-fast-image';

import {useSaveImage} from '../../hooks/useSaveImage';
import {useImageLayout} from '../../hooks/useImageLayout';
import {useGesture} from '../../hooks/useGesture';
import {CropMask} from './components/CropMask/CropMask';
import {
  CROP_CONTAINER_HEIGHT,
  CROP_CONTAINER_WIDTH,
  MAX_IMAGE_SCALE,
  MIN_IMAGE_SCALE,
} from './ImageRoundCrop.constants';
import {ImageRoundCropProps} from './ImageRoundCrop.types';
import {styles} from './ImageRoundCrop.styles';

export const ImageRoundCrop = memo(
  ({
    style,
    imageUri,
    onLoad,
    onSubmitImageCrop,
    ...props
  }: ImageRoundCropProps) => {
    const {onChangeImageSize, ...imageLayout} = useImageLayout({
      containerHeight: CROP_CONTAINER_HEIGHT,
      containerWidth: CROP_CONTAINER_WIDTH,
    });

    const {gesture, animatedStyle, cropRectangle} = useGesture({
      maxScale: MAX_IMAGE_SCALE,
      minScale: MIN_IMAGE_SCALE,
      containerHeight: CROP_CONTAINER_HEIGHT,
      containerWidth: CROP_CONTAINER_WIDTH,
      ...imageLayout,
    });

    const saveImage = useSaveImage();

    const imageSource = useMemo(() => ({uri: imageUri}), [imageUri]);
    const imageDynamicStyle = useMemo(
      () => ({width: imageLayout.width, height: imageLayout.height}),
      [imageLayout.width, imageLayout.height],
    );

    const handleSubmit = async () => {
      const imagePath = await saveImage(
        imageUri,
        cropRectangle.value.x,
        cropRectangle.value.y,
        cropRectangle.value.width,
        cropRectangle.value.height,
      );
      onSubmitImageCrop(imagePath);
    };

    const handleImageLoad = useCallback(
      (event: OnLoadEvent) => {
        onLoad?.(event);
        onChangeImageSize(event.nativeEvent);
      },
      [onChangeImageSize, onLoad],
    );

    return (
      <View style={styles.container}>
        <GestureDetector gesture={gesture}>
          <CropMask>
            <View style={styles.content}>
              <Animated.View style={animatedStyle}>
                <FastImage
                  {...props}
                  source={imageSource}
                  resizeMode="contain"
                  onLoad={handleImageLoad}
                  style={[style, imageDynamicStyle]}
                />
              </Animated.View>
            </View>
          </CropMask>
        </GestureDetector>

        <View style={styles.button}>
          <Button title="Продолжить" onPress={handleSubmit} />
        </View>
      </View>
    );
  },
);
