import {
  clamp,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';

interface Props {
  maxScale: number;
  minScale: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  containerHeight: number;
  containerWidth: number;
  realImageRatio: number;
}

export const useGesture = ({
  minScale = 1,
  maxScale = 3,
  centerX,
  centerY,
  width,
  height,
  containerHeight,
  containerWidth,
  realImageRatio,
}: Props) => {
  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);

  const imageOffset = useSharedValue({x: 0, y: 0});
  const startImageOffset = useSharedValue({x: 0, y: 0});

  const startFocal = useSharedValue({x: 0, y: 0});

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: imageOffset.value.x},
      {translateY: imageOffset.value.y},
      {scale: scale.value},
    ],
  }));

  /**
   * Constraints for fit image in container
   */
  const offsetConstraints = useDerivedValue(() => {
    const yLimitOffset = (height * scale.value - containerHeight) / 2;
    const xLimitOffset = (width * scale.value - containerWidth) / 2;

    return {
      yMax: yLimitOffset,
      yMin: -yLimitOffset,
      xMax: xLimitOffset,
      xMin: -xLimitOffset,
    };
  });

  /**
   * Cast our positions and crop area to fit the real image size, need to crop image natively
   * FYI: CROP_OFFSET isn't influences on final result, but can be added to calculations
   */
  const cropRectangle = useDerivedValue(() => {
    const xAxisBasic =
      startImageOffset.value.x - (scale.value * width - containerWidth) / 2;

    /**
     *  Y axis from CGRect that use ImageManager is inverted!
     **/
    const yAxisBasic =
      startImageOffset.value.y - (scale.value * height - containerHeight) / 2;

    return {
      x: (-xAxisBasic / scale.value) * realImageRatio,
      y: (-yAxisBasic / scale.value) * realImageRatio,
      width: (containerWidth / scale.value) * realImageRatio,
      height: (containerHeight / scale.value) * realImageRatio,
    };
  });

  /**
   * Reset image to initial position and scale with animation
   */
  const reset = () => {
    'worklet';

    scale.value = withTiming(1);
    startScale.value = 1;
    imageOffset.value = {
      x: withTiming(0),
      y: withTiming(0),
    };
    startImageOffset.value = {x: 0, y: 0};
    startFocal.value = {x: 0, y: 0};
  };

  /**
   * Set image offset to max or min allowed values for both axises, to fit container
   */
  const handleLimits = () => {
    'worklet';

    const lastValues = imageOffset.value;

    if (imageOffset.value.y > offsetConstraints.value.yMax) {
      lastValues.y = offsetConstraints.value.yMax;
    } else if (imageOffset.value.y < offsetConstraints.value.yMin) {
      lastValues.y = offsetConstraints.value.yMin;
    }

    if (imageOffset.value.x > offsetConstraints.value.xMax) {
      lastValues.x = offsetConstraints.value.xMax;
    } else if (imageOffset.value.x < offsetConstraints.value.xMin) {
      lastValues.x = offsetConstraints.value.xMin;
    }

    imageOffset.value = {
      x: withTiming(lastValues.x),
      y: withTiming(lastValues.y),
    };

    startImageOffset.value = lastValues;
  };

  /**
   * Change image position by move finger gesture
   *
   * onUpdate - change current image position on the axises
   * onEnd - compliance values with the limits
   */
  const moveGesture = Gesture.Pan()
    .onUpdate(event => {
      imageOffset.value = {
        x: event.translationX + startImageOffset.value.x,
        y: event.translationY + startImageOffset.value.y,
      };
    })
    .onEnd(() => {
      handleLimits();
    });

  /**
   * Zoom and change image position by pinch gesture
   *
   * onStart - save previous image scale and position
   * onUpdate - change current image position on the axises with scale influence
   * onEnd - compliance values with the limits
   */
  const pinchGesture = Gesture.Pinch()
    .onStart(event => {
      startScale.value = scale.value;
      startFocal.value = {
        x: event.focalX,
        y: event.focalY,
      };
    })
    .onUpdate(event => {
      scale.value = clamp(
        startScale.value + (event.scale - minScale),
        minScale,
        maxScale,
      );

      imageOffset.value = {
        x:
          startImageOffset.value.x +
          (centerX - startFocal.value.x) * (scale.value - startScale.value),
        y:
          startImageOffset.value.y +
          (centerY - startFocal.value.y) * (scale.value - startScale.value),
      };
    })
    .onEnd(() => {
      handleLimits();
    });

  /**
   * Scales image by double tap to max or to min zoom
   *
   * onEnd - if zoom is not max, it will zoom to max, respecting the finger position
   *         else - reset to initial
   */
  const tapZoomGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(event => {
      if (scale.value < maxScale) {
        const newValues = {x: centerX - event.x, y: centerY - event.y};

        imageOffset.value = {
          x: withTiming(newValues.x),
          y: withTiming(newValues.y),
        };
        scale.value = withTiming(maxScale);

        startImageOffset.value = newValues;
      } else {
        reset();
      }
    });

  const gesture = Gesture.Race(moveGesture, tapZoomGesture, pinchGesture);

  return {gesture, animatedStyle, cropRectangle};
};
