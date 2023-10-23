import React, {PropsWithChildren, memo} from 'react';
import {View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import {styles} from './CropMask.styles';

export const CropMask = memo(({children}: PropsWithChildren) => (
  <MaskedView
    maskElement={
      <View style={styles.maskContentContainer}>
        <View style={styles.maskContent} />
      </View>
    }>
    {children}
  </MaskedView>
));
