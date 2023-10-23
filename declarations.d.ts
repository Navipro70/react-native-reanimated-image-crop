import type {ImageManagerStatic} from './src/nativeModules/ImageManager/imageManager.types';

declare module 'react-native' {
  interface NativeModulesStatic {
    ImageManager: ImageManagerStatic;
  }
}
