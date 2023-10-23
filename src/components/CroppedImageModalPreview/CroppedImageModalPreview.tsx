import React, {memo} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './CroppedImageModalPreview.styles';

interface Props {
  isVisible: boolean;
  imagePath: string | null;
  onClose: () => void;
}

export const CroppedImageModalPreview = memo(
  ({isVisible, imagePath, onClose}: Props) => (
    <Modal
      style={styles.container}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.close} onPress={onClose}>
          <Text>Закрыть</Text>
        </TouchableOpacity>
        {imagePath && <Image style={styles.image} source={{uri: imagePath}} />}
      </View>
    </Modal>
  ),
);
