/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {ImageRoundCrop} from './src/components/ImageRoundCrop/ImageRoundCrop';
import {View} from 'react-native';
import {CroppedImageModalPreview} from './src/components/CroppedImageModalPreview/CroppedImageModalPreview';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1615022702095-ff2c036f3360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80';

export const App = () => {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onCloseModal = useCallback(() => setIsModalVisible(false), []);

  const onSubmitImageCrop = useCallback((newImagePath: string | null) => {
    if (newImagePath) {
      setImagePath(newImagePath);
      setIsModalVisible(true);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <CroppedImageModalPreview
        isVisible={isModalVisible}
        imagePath={imagePath}
        onClose={onCloseModal}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ImageRoundCrop
          imageUri={DEFAULT_IMAGE}
          onSubmitImageCrop={onSubmitImageCrop}
        />
      </View>
    </GestureHandlerRootView>
  );
};
