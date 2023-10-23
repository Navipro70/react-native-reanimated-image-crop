import type {FastImageProps} from 'react-native-fast-image';

export interface ImageRoundCropProps
  extends Omit<FastImageProps, 'resizeMode' | 'source'> {
  imageUri: string;
  onSubmitImageCrop: (imagePath: string | null) => void;
}
